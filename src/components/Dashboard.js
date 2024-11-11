import React, { useState } from "react";
import { UserForm } from "./UserForm";
import { Modal } from "./Modal";
import { UsersList } from "./UsersList";
import { Sidebar } from "./Sidebar";

const Home = () => {
  return;
};
export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const handleAddUser = () => {
    setShowModal(true);
    setShowUserList(false);
  };
  const handleUserAdded = () => {
    setShowModal(false);
    setShowUserList(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {showUserList && (
          <div className="user-list-section">
            <UsersList />
          </div>
        )}
        <div className="add-user-section">
          <button className="add-user-button" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <UserForm onUserAdded={handleUserAdded} />
      </Modal>
    </div>
  );
};
