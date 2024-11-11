import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const fetchUsers = ({ queryKey }) => {
  const [_, userId] = queryKey;
  return axios.get(`http://localhost:4000/users/${userId}`);
};

export const UserDetails = () => {
  const { userId } = useParams();
  const { data, isLoading, isError, error } = useQuery(
    ["user", userId],
    fetchUsers
  );
  if (isLoading) return;
  <div>
    <h2>sir P stop mixing cream</h2>
  </div>;
  if (isError) return;
  <div>
    <h2>divine reload: error.message </h2>
  </div>;
  return (
    <div className="userDetailsContainer">
      <h1 className="userName">{data?.data.name}</h1>
      <p className="userDetail">
        <span>Email Address:</span> {data?.data.email}
      </p>
      <p className="userDetail">
        <span>Phone Number:</span> {data?.data.number}
      </p>
      <p className="userDetail">
        <span>Enroll Number:</span> {data?.data.E_number}
      </p>
      <p className="userDetail">
        <span>Date:</span> {data?.data.date}
      </p>
    </div>
  );
};
