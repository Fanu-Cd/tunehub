import React from "react";
import styled from "@emotion/styled";

//Interfaces
interface ISong {
  data: {
    Title: "";
    Artist: "";
    Album: "";
    Genre: "";
  };
  onEdit: () => void;
  onDelete: () => void;
}

const Song: React.FC<ISong> = (props: ISong) => {
  //Components
  const SongDiv = styled.div(
    `width:100%;height:3rem;border:0.1rem solid black;border-radius:0.2rem;display:flex;justify-content:space-between;align-items:center;padding:0.2rem;margin-bottom:1rem`
  );

  const Button = styled.button(`background-color:white;border:0;cursor:pointer
  `);

  return props.data.Title ? (
    <SongDiv>
      <p style={{ margin: "0", width: "20%" }}>{props.data.Title}</p>
      <p style={{ margin: "0", width: "20%" }}>
        {props.data.Genre ? props.data.Genre : "-"}
      </p>
      <p style={{ margin: "0", width: "20%" }}>
        {props.data.Album ? props.data.Album : "-"}
      </p>
      <p style={{ margin: "0", width: "20%" }}>
        {props.data.Artist ? props.data.Artist : "-"}
      </p>
      <div
        style={{
          width: "18%",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          marginLeft: "auto",
        }}
      >
        <Button onClick={props.onEdit} style={{ color: "blue" }}>
          Edit
        </Button>
        <Button onClick={props.onDelete} style={{ color: "red" }}>
          Delete
        </Button>
      </div>
    </SongDiv>
  ) : (
    <div style={{ color: "red" }}>No Song</div>
  );
};

export default Song;
