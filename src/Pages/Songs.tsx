import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import Song from "../Components/Song";
import EditModal from "../Components/EditModal";
import AddModal from "../Components/AddModal";
import { setSongData } from "../store/store";

const Songs: React.FC = () => {
  const apiUrl = "http://localhost:3001";
  const dispatch = useDispatch();

  //Fetch all songs on Component Mount
  useEffect(() => {
    fetchAllSongs();
  }, []);

  const fetchAllSongs = () => {
    fetch(`${apiUrl}/getAllSongs`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) dispatch(setSongData(res.result));
      })
      .catch((err) => {
        console.log("err");
      });
  };

  //Components
  const MainDiv = styled.div(
    `width:90%;min-height:40rem;background-color:white;margin:2rem auto;border-radius:1rem;padding:1rem;display:flex;flex-direction:column;justify-content:center;align-items:center`
  );

  const SongsDiv = styled.div(
    `border:0.1rem solid black;width:90%;height:30rem;overflow:auto;background-color:white;margin:1rem auto;padding:1rem;display:flex;flex-direction:column;justify-content:center;border-radius:1rem`
  );

  const AddButton = styled.button(
    `width:7rem;height:2rem;background-color:darkslategray;color:white;border-radius:0.7rem;cursor:pointer`
  );

  //States
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [initialInput, setInitialInput] = useState({
    _id: "",
    Title: "",
    Artist: "",
    Album: "",
    Genre: "",
  });

  const songs = useSelector(
    (state: { myReducer: { songData: any[] } }) => state.myReducer.songData
  );

  //Actions
  const handleDelete = (song_id: string) => {
    console.log("id", song_id);
    if (window.confirm("Delete this song ?") == true) {
      fetch(`${apiUrl}/deleteSong/${song_id}`)
        .then((res) => res.json)
        .then((res) => {
          fetchAllSongs();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <MainDiv>
      <h2>Songs</h2>
      <AddButton onClick={() => setOpenAddModal(true)}>Add Song</AddButton>
      <SongsDiv>
        {songs.length > 0 ? (
          songs.map((song) => (
            <Song
              key={song._id}
              data={song}
              onEdit={() => {
                setOpenModal(true);
                setInitialInput(song);
              }}
              onDelete={() => handleDelete(song._id)}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            Fetching Songs...
          </p>
        )}
      </SongsDiv>

      <EditModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        initialInput={initialInput}
        fetchAllSongs={fetchAllSongs}
      />

      <AddModal
        openAddModal={openAddModal}
        setOpenAddModal={setOpenAddModal}
        fetchAllSongs={fetchAllSongs}
      />
    </MainDiv>
  );
};

export default Songs;
