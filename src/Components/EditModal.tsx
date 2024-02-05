// Modal.js
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";

// Styled Components
const ModalWrapper = styled.div`
  position: fixed;
  top: 20%;
  left: 25%;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  max-width: 30rem;
  width: 100%;
  min-height: 10rem;
  height: auto;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: red;
  font-size: 1.2rem;
  float: right;
`;

interface ModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  initialInput:{_id:string,Title:string,Artist:string,Album:string,Genre:string},
  fetchAllSongs: () => void;
}

interface SongInput {
  title: string;
  genre: string;
  album: string;
  artist: string;
}

// Modal component
const EditModal: React.FC<ModalProps> = ({
  openModal,
  setOpenModal,
  initialInput,
  fetchAllSongs
}) => {
  const apiUl = "http://localhost:3001";

  useEffect(()=>{
    setInput({title:initialInput.Title,artist:initialInput.Artist,album:initialInput.Album,genre:initialInput.Genre})
    console.log(initialInput)
  },[])

  const [input, setInput] = useState<SongInput>({
    title: "",
    genre: "",
    album: "",
    artist: "",
  });
  
  //Form Data Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prevState) => ({ ...prevState, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("title", input.title);
    fetch(`${apiUl}/updateSong`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({...input,id:initialInput._id}),
    })
      .then((res) => res.json())
      .then((res) => {
        fetchAllSongs();
        setInput({title:"",artist:"",album:"",genre:""})
        setOpenModal(false)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    openModal && (
      <ModalWrapper>
        <ModalContent>
          <CloseButton onClick={() => setOpenModal(false)}>X</CloseButton>
          <h4 style={{ textAlign: "center", margin: "0" }}>Edit Song</h4>
          <form
            onSubmit={handleSubmit}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Title</label>
            <input
              name="title"
              key="title"
              value={input.title}
              onChange={handleChange}
              required
            />
            <label style={{ marginTop: "0.5rem" }}>Genre</label>
            <input
              name="genre"
              key="genre"
              value={input.genre}
              onChange={handleChange}
            />
            <label style={{ marginTop: "0.5rem" }}>Album</label>
            <input
              name="album"
              key="album"
              value={input.album}
              onChange={handleChange}
            />
            <label style={{ marginTop: "0.5rem" }}>Artist</label>
            <input
              name="artist"
              key="artist"
              value={input.artist}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              style={{
                width: "40%",
                height: "2rem",
                margin: "0.5rem auto",
                borderRadius: "0.5rem",
                border: "0.1rem solid black",
                background: "darkslategray",
                color: "white",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </form>
        </ModalContent>
      </ModalWrapper>
    )
  );
};

export default EditModal;
