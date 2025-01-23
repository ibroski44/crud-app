import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "react-query";
import axios from "axios";
import { z } from "zod";

// Define the Zod schema for validation
const userSchema = z.object({
  name: z.string().min(5, {
    message: "Full Name is required and must be at least 5 letters.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  number: z
    .string()
    .regex(/^\d{11}$/, { message: "Phone Number must be 11 digits." }),
  E_number: z.string().min(1, { message: "Enroll Number is required." }),
  date: z.string().nonempty({ message: "Date is required." }),
  photo: z.string().url().optional(), // Optional photo field to hold the URL
});

// Fetch users
const fetchUsers = () => axios.get("http://localhost:4000/users");

export const UserForm = ({ initialData = {}, onUserAdded }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [number, setNumber] = useState(initialData.number || "");
  const [E_number, setE_number] = useState(initialData.E_number || "");
  const [date, setDate] = useState(initialData.date || "");
  const [photo, setPhoto] = useState("");
  const [preview, setPreview] = useState(null); // For image preview
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  // Fetch existing users
  const { data: usersData } = useQuery("users", fetchUsers);

  const addUserMutation = useMutation(
    (newUser) => axios.post("http://localhost:4000/users", newUser),
    {
      onSuccess: (data) => {
        queryClient.setQueryData("users", (oldData) => {
          if (!oldData) return [data.data]; // If no previous data, start a new array
          return [data.data, ...oldData]; // Add new user at the top
        });
        queryClient.invalidateQueries("users");
        onUserAdded();
      },
    }
  );

  // Upload image function
  const uploadPhoto = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:4000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.url; // Assume the server returns the uploaded image URL
    } catch (error) {
      console.error("Upload failed:", error);
      setErrors((prev) => ({ ...prev, photo: ["Image upload failed."] }));
      return null;
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        photo: ["Only JPG/PNG images are allowed."],
      }));
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        photo: ["Image size must be under 2MB."],
      }));
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result); // Set preview image when file is loaded
    };
    reader.readAsDataURL(file);

    // Upload image (this step is optional if you want to store the image)
    const imageUrl = await uploadPhoto(file);
    if (imageUrl) {
      setPhoto(imageUrl); // Store URL for submission
      setErrors((prev) => ({ ...prev, photo: null })); // Clear any previous error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validate the form data using Zod
    const result = userSchema.safeParse({
      name,
      email,
      number,
      E_number,
      date,
      photo, // Include photo URL in the form validation
    });

    if (!result.success) {
      // If validation fails, set the errors state
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
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

    // If no duplicates, proceed with user creation
    addUserMutation.mutate({ name, email, number, E_number, date, photo });
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
          <label>Upload Photo</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
          />
          {preview && (
            <img src={preview} alt="Preview" className="image-preview" />
          )}
          {errors.photo && <p className="error">{errors.photo[0]}</p>}
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
