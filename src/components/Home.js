import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Dashboard } from "./Dashboard";
import { Sidebar } from "./Sidebar";

export const Home = () => {
  return (
    <div className="dash">
      <Sidebar />
      <div className="cfr">
        <div className="wq">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <span>
              <img src="/sear.png" alt="sear" className="emojis3" />
            </span>
          </div>
          <div className="notification-bell">
            <img
              src="/bell.png"
              alt="Notification Bell"
              className="bell-icon"
            />
          </div>
        </div>
        <div className="body-part2">
          <div className="body-part1">
            <img src="/Student-cap.png" alt="cap" className="image1" />
            <h3 className="user-name">Students</h3>
            <h3 className="user-name1">243</h3>
          </div>
          <div className="body-part3">
            <img src="/online-education.png" alt="cap" className="image1" />
            <h3 className="user-name">Courses</h3>
            <h3 className="user-name1">13</h3>
          </div>
          <div className="body-part4">
            <img src="/invoice.png" alt="cap" className="image1" />
            <h3 className="user-name">Payment</h3>
            <h3 className="user-name13">
              <span className="nigeria">NGN</span>556,000
            </h3>
          </div>
          <div className="body-part5">
            <img src="/minus.png" alt="cap" className="image1" />
            <h3 className="user-names">Users</h3>
            <h3 className="user-name1">3</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
