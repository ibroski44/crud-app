import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { z } from "zod";

// Define the Zod schema for validation
const userSchema = z.object({
  name: z.string().min(5, "Full Name must be at least 5 characters."),
  email: z.string().email("Invalid email address."),
  number: z.string().regex(/^\d{11}$/, "Phone Number must be 11 digits."),
  E_number: z.string().min(1, "Enroll Number is required."),
  date: z.string().nonempty("Date is required."),
  photo: z.string().url().optional(),
});

const fetchUsers = () => axios.get("http://localhost:4000/users");

export const UserForm = ({ initialData = {}, onUserAdded }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [number, setNumber] = useState(initialData.number || "");
  const [E_number, setE_number] = useState(initialData.E_number || "");
  const [date, setDate] = useState(initialData.date || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const { data: usersData } = useQuery("users", fetchUsers);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/images");
        setUploadedImages(response.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };
    fetchImages();
  }, []);

  const addUserMutation = useMutation(
    (newUser) => axios.post("http://localhost:4000/users", newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        onUserAdded();
      },
    }
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setSelectedImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = async () => {
      const newImage = {
        id: Date.now(),
        imageUrl: reader.result,
      };
      try {
        await axios.post("http://localhost:4000/images", newImage);
        setUploadedImages([...uploadedImages, newImage]);
        alert("Image uploaded successfully!");
      } catch (error) {
        console.error("Error uploading image", error);
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const result = userSchema.safeParse({
      name,
      email,
      number,
      E_number,
      date,
      photo: preview,
    });

    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    // Check for duplicates
    const users = usersData?.data || [];
    const emailExists = users.some((user) => user.email === email);
    const phoneExists = users.some((user) => user.number === number);
    const enrollExists = users.some((user) => user.E_number === E_number);

    if (emailExists || phoneExists || enrollExists) {
      setErrors({
        email: emailExists ? ["This email is already registered."] : [],
        number: phoneExists ? ["This phone number is already in use."] : [],
        E_number: enrollExists
          ? ["This enroll number is already assigned."]
          : [],
      });
      return;
    }

    addUserMutation.mutate({
      name,
      email,
      number,
      E_number,
      date,
      photo: preview,
    });
  };

  return (
    <div className="Ib-form">
      <h1>Please fill the form</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-label">
          <label>Full-Name</label>
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div className="form-label">
          <label>Email-Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div className="form-label">
          <label>Phone Number</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {errors.number && <p className="error">{errors.number[0]}</p>}
        </div>
        <div className="form-label">
          <label>Enroll Number</label>
          <input
            type="number"
            value={E_number}
            onChange={(e) => setE_number(e.target.value)}
          />
          {errors.E_number && <p className="error">{errors.E_number[0]}</p>}
        </div>
        <div className="form-label">
          <label>Date of Admission</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <p className="error">{errors.date[0]}</p>}
        </div>
        <div className="form-label">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: 50, height: 50 }}
            />
          )}
        </div>
        <button
          className="btn12"
          type="submit"
          disabled={addUserMutation.isLoading}
        >
          {addUserMutation.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
