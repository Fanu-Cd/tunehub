import React from "react";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
const NavBar: React.FC = () => {
  const NavBar = styled.div(
    `background-color:inherit;min-height:3rem;width:90%;margin:auto;display:flex;justify-content:space-between;align-items:center`
  );
  const AccountCircle = styled.div(
    `width:2rem;height:2rem;border:0.1rem solid white;background-color:white;border-radius:2rem`
  );

  return (
    <NavBar>
      <div>
        <h2 style={{ color: "white" }}>TuneHub</h2>
      </div>
      <div
        style={{
          minWidth: "10rem",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <div style={{ marginRight: "2rem" }}>
          <Link
            to="/home"
            style={{
              color: "white",
              textDecoration: "none",
              marginRight: "1rem",
            }}
          >
            Home
          </Link>
          <Link to="/songs" style={{ color: "white", textDecoration: "none" }}>
            Songs Library
          </Link>
        </div>

        <AccountCircle></AccountCircle>
      </div>
    </NavBar>
  );
};

export default NavBar;
