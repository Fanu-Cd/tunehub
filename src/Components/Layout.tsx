import React from "react";
import { Box } from "rebass";
import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
const Layout: React.FC = () => {

  return (
    <Box
      css={`
        background-color: #3498db;
        width: 100%;
        padding: 1rem auto;
        margin: auto;
        height: 100vh;
      `}
    >
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default Layout;
