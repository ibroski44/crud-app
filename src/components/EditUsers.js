import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const EditUsers = () => {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the user's data to edit
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Send updated user data to the server
    axios
      .put(`http://localhost:4000/users/${id}`, user)
      .then(() => {
        // Navigate back to users list after successful update
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  if (isLoading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  return (
    <div className="edit-user-container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate} className="edit-user-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Email Address:</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="number"
            value={user.number}
            onChange={(e) => setUser({ ...user, number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Enroll Number:</label>
          <input
            type="number"
            value={user.E_number}
            onChange={(e) => setUser({ ...user, E_number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={user.date}
            onChange={(e) => setUser({ ...user, date: e.target.value })}
          />
        </div>
        <button type="submit" className="submit-button">
          Update
        </button>
      </form>
    </div>
  );
};
