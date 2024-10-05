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

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};
