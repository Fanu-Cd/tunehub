import React from "react";
import styled from "@emotion/styled";
import { Box, Flex } from "rebass";
import { MySvg } from "../Components/MySvg";
import { Link } from "react-router-dom";
const Home: React.FC = () => {
  //Components
  const Button = styled.button(
    `color:white;font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;background-color:darkslategray;font-size:1.1rem;border-radius:0.8rem;height:3rem;width:60%;margin:2rem auto;border:0;cursor:pointer`
  );

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
      <Flex
        css={`
          width: 95%;
          margin: 5rem auto;
          min-height: 35rem;
        `}
      >
        <Box
          width="50%"
          css={`
            display: flex;
            flex-direction: column;
            min-height: 100%;
          `}
        >
          <h1
            style={{
              padding: "1rem",
              fontSize: "3rem",
              maxWidth: "60%",
              margin: "0",
              color: "white",
            }}
          >
            LISTEN TO SONGS
          </h1>
          <div
            style={{
              margin: "-1rem 0 0 1rem",
              width: "6rem",
              height: "1rem",
              backgroundColor: "yellow",
            }}
          ></div>
          <p
            style={{
              padding: "1rem",
              color: "white",
              fontFamily: "cursive",
              fontSize: "1.2rem",
              width: "70%",
            }}
          >
            When you have things without thoughts, you can stop things in your
            hands. Listen to the song a little and relax, maybe there is an
            answer.
          </p>
          <Link to="/home">
            <Button>Get Started</Button>
          </Link>
        </Box>
        <Box
          width="50%"
          css={`
            min-height: 100%;
            border: 0;
          `}
        >
          <MySvg />
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
