import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="dashboard-container">
      <div className="Dashboard-ib">
        <div className="profile-section">
          <h1 className="user-nam">CRUD-OPERATIONS</h1>
          <img src="/W.png" alt="User Profile" className="profile-image" />

          <h1 className="user-nas">
            IBROSKI44<span className="Admin">Admin</span>
          </h1>
        </div>
        <ul className="nav-links">
          <li className="active-linkes">
            <Link to="/">
              <span>
                <img src="/h.png" alt="cap" className="emojis1" />
              </span>{" "}
              Home
            </Link>
          </li>
          <li>
            <span>
              {" "}
              <img src="/b.png" alt="cap" className="image13" />
            </span>{" "}
            Courses
          </li>
          <li className="active-linkes">
            <Link to="/dashboard ">
              <span>
                <img src="/ca.png" alt="cap" className="emojis12" />
              </span>{" "}
              Student
            </Link>
          </li>
          <li>
            {" "}
            <span>
              <img src="/pa.png" alt="cap" className="emojis4" />
            </span>{" "}
            Payment
          </li>
          <li>
            <span>
              <img src="/se.png" alt="cap" className="emojis44" />
            </span>{" "}
            Settings
          </li>
        </ul>
        <div className="logout">
          <button className="logout-button">
            Log Out{" "}
            <span>
              {" "}
              <img src="/si.png" alt="cap" className="image11" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
