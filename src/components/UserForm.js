import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserForm = ({ initialData = {} }) => {
  const [name, setName] = useState(initialData.name || "");
  const [email, setEmail] = useState(initialData.email || "");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addUserMutation = useMutation(
    (newUser) => axios.post("http://localhost:4000/users", newUser),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        navigate("/path");
      },
    }
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    addUserMutation.mutate({ name, email });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Name</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Email</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};
