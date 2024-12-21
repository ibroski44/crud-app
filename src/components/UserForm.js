import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { z } from "zod";

// Define the Zod schema for validation
const userSchema = z.object({
  name: z.string().min(5, {
    message: "Full Name is required and must be atleast 3 letter words.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  number: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone Number must be 10 digits." }),
  E_number: z.string().min(1, { message: "Enroll Number is required." }),
  date: z
    .string()
    .refine((val) => val !== "", { message: "Date is required." }),
});

export const UserForm = ({ initialData = {}, onUserAdded }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [number, setNumber] = useState(initialData.number || "");
  const [E_number, setE_number] = useState(initialData.E_number || "");
  const [date, setDate] = useState(initialData.date || "");
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();

  const addUserMutation = useMutation(
    (newUser) => axios.post("http://localhost:4000/users", newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        onUserAdded();
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validate the form data using Zod
    const result = userSchema.safeParse({
      name,
      email,
      number,
      E_number,
      date,
    });

    if (!result.success) {
      // If validation fails, set the errors state
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }
    // If validation pass
    addUserMutation.mutate({ name, email, number, E_number, date });
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

        <button className="btn12" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
