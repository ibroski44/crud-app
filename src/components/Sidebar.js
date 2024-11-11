import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="dashboard-container">
      <div className="Dashboard-ib">
        <div className="profile-section">
          <h1 className="user-nam">CRUD-OPERATIONS</h1>
          <img src="/W.png" alt="User Profile" className="profile-image" />

          <h1 className="user-name">
            IBROSKI44<span className="Admin">Admin</span>
          </h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Courses</li>
          <li>
            <Link to="/dashboard ">Student</Link>
          </li>
          <li>Payment</li>
          <li>Settings</li>
        </ul>
        <div className="logout">
          <button className="logout-button">Log Out</button>
        </div>
      </div>
    </div>
  );
};
