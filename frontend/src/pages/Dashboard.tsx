// src/App.tsx
import React from "react";
import TaskList from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.user.userDetails);
  const userName = `${userDetails.fname} ${userDetails.lname}`.toUpperCase();
  const userId = userDetails.userId;
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    // Implement logout functionality here
    console.log("Logout clicked");
  };
  return (
    <div className="dashboard">
      <Header username={userName} onLogout={handleLogout} />
      <TaskList userId={userId} />
    </div>
  );
};

export default Dashboard;
