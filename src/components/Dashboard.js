import React, { useState } from "react";
import { UserForm } from "./UserForm";
import { Modal } from "./Modal";
import { UsersList } from "./UsersList";

import { Link, Route, Routes } from "react-router-dom";

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
      <div className="Dashboard-ib">
        <div className="profile-section">
          <img
            src="https://via.placeholder.com/80"
            alt="User Profile"
            className="profile-image"
          />
          <h3 className="user-name">John Doe</h3>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Courses</li>
          <li>Student</li>
          <li>Payment</li>
          <li>Settings</li>
        </ul>
        <div className="logout">
          <button className="logout-button">Log Out</button>
        </div>
      </div>
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
