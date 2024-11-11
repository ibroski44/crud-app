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
  <div className="loading">
    <h1>divine go and wash plate</h1>
  </div>;
  if (isError) return;
  <div className="error">
    <h1>
      common reload it <span>404 Error</span>
    </h1>
  </div>;
  return (
    <div className="container">
      <h2 className="heading">Students List</h2>
      <div className="heading-1">
        <span className="details">NAMES</span>
        <span className="details">EMAIL ADDRESS</span>
        <span className="details">PHONE-NUMBER</span>
        <span className="details">ENROLL-NUMBER</span>
        <span className="details">DATE</span>
      </div>
      <ul className="list">
        {data?.data.map((user) => (
          <li key={user.id} className="listItem">
            <div className="userInfo">
              <Link to={`/users/${user.id}`} className="link">
                {user.name}
              </Link>

              <span className="detail">{user.email}</span>
              <span className="detail">{user.number}</span>
              <span className="detail">{user.E_number}</span>
              <span className="detail">{user.date}</span>
            </div>
            <div className="actions">
              <Link to={`/edit-user/${user.id}`}>
                <button className="button">Edit</button>
              </Link>
              <button
                className="deleteButton"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
