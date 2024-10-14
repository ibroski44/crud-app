import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";

export const Home = () => {
  return (
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
        <li>Home</li>
        <li>Courses</li>
        <li>
          <Link to="/Dashboard">Student</Link>
        </li>
        <li>Payment</li>
        <li>Settings</li>
      </ul>
      <div className="logout">
        <button className="logout-button">Log Out</button>
      </div>
      <Routes>
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
      <div className="body-part">
        <div>
          <h1>Student</h1>
        </div>
        <div>
          <h1>class</h1>
        </div>
        <div>
          <h1>Amount</h1>
        </div>
      </div>
    </div>
  );
};
