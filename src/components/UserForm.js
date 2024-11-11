import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

export const UserForm = ({ initialData = {}, onUserAdded }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [number, setNumber] = useState(initialData.number || "");
  const [E_number, setE_number] = useState(initialData.E_number || "");
  const [date, setDate] = useState(initialData.date || "");
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
    addUserMutation.mutate({ name, email, number, E_number, date });
  };
  return (
    <div className="Ib-form">
      <h1>Please fill the form</h1>
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-label">
          <label>Full-Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-label">
          <label>Email-Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-label">
          <label>Phone Number</label>
          <input value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div className="form-label">
          <label>Enroll Number</label>
          <input
            value={E_number}
            onChange={(e) => setE_number(e.target.value)}
          />
        </div>
        <div className="form-label">
          <label>Date of Admission</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <button className="btn12" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};
