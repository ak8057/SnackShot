import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/logout.css";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call your backend logout API
      await axios.get(
        "http://localhost:3000/api/auth/foodPartner/logout",
        {},
        { withCredentials: true } // 👈 important to send cookies
      );

      // Clear client-side storage
      localStorage.clear();
      sessionStorage.clear();

      // Redirect to login or home
      navigate("/user/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button className="logout-btn" onClick={handleLogout}>
      L
    </button>
  );
};

export default LogoutButton;
