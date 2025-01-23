import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Modal } from "./Modal";
import { EditUsers } from "./EditUsers";

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

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (id) => {
    deleteUserMutation.mutate(id);
  };
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
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

      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>NAMES</th>
            <th>EMAIL ADDRESS</th>
            <th>PHONE NUMBER</th>
            <th>ENROLL NUMBER</th>
            <th>DATE</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((user) => (
            <tr key={user.id}>
              <td>
                <span>
                  <img src="/w.png" alt="cap" className="imag-load" />
                </span>
              </td>
              <td>
                <Link to={`/users/${user.id}`} className="link">
                  {user.name}
                </Link>
              </td>
              <td>{user.email}</td>
              <td>{user.number}</td>
              <td>{user.E_number}</td>
              <td>{user.date}</td>
              <td>
                <button
                  className="deleteButton1"
                  onClick={() => handleEdit(user)}
                >
                  <span>
                    <img src="/edit.png" alt="cap" className="image-load" />
                  </span>
                </button>
                <button
                  className="deleteButton1"
                  onClick={() => handleDelete(user.id)}
                >
                  <span>
                    <img src="/trash 1.png" alt="cap" className="image-load" />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit User Modal */}
      <Modal show={showEditModal} onClose={handleCloseEditModal}>
        {selectedUser && (
          <EditUsers user={selectedUser} onClose={handleCloseEditModal} />
        )}
      </Modal>
    </div>
  );
};
