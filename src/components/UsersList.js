import React from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchUsers = () => {
  return axios.get("http://localhost:4000/users");
};

const deleteUsers = (id) => {
  return axios.delete(`http://localhost:4000/users/${id}`);
};

export const UsersList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery("users", fetchUsers);
  const deleteUserMutation = useMutation(deleteUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  const handleDelete = (id) => {
    deleteUserMutation.mutate(id);
  };

  if (isLoading) return;
  <div>
    <h1>divine go and wash plate</h1>
  </div>;
  if (isError) return;
  <div>
    <h1>
      common reload it <span>404 Error</span>
    </h1>
  </div>;
  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {data?.data.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            <Link to={`/edit-user/${user.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
