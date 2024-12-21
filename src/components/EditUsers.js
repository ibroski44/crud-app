import React, { useState } from "react";
import axios from "axios";

export const EditUsers = ({ user, onClose }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [number, setNumber] = useState(user.number);
  const [E_number, setE_number] = useState(user.E_number);
  const [date, setDate] = useState(user.date);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/users/${user.id}`, {
        name,
        email,
        number,
        E_number,
        date,
      })
      .then(() => {
        onClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <form onSubmit={handleUpdate} className="edit-user-form">
      <h2>Edit User</h2>
      <div className="form-group">
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input value={number} onChange={(e) => setNumber(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Enroll Number:</label>
        <input
          type="number"
          value={E_number}
          onChange={(e) => setE_number(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="submit-button">
        Update
      </button>
      <button type="button" onClick={onClose} className="cancel-button">
        Cancel
      </button>
    </form>
  );
};
