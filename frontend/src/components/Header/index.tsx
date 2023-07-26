// src/components/Header.tsx
import React from "react";
import { Layout, Button } from "antd";
import "./Header.css"; // Create a CSS file for custom styles

const { Header } = Layout;

interface HeaderProps {
  username: string;
  onLogout: () => void;
}

const CustomHeader: React.FC<HeaderProps> = ({ username, onLogout }) => {
  return (
    <Header className="custom-header">
      <span className="username">{username}</span>
      <Button type="primary" onClick={onLogout}>
        Logout
      </Button>
    </Header>
  );
};

export default CustomHeader;
