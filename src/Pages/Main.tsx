import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Box } from "rebass";
import { useSelector, useDispatch } from "react-redux";
import {
  setSongs,
  setArtists,
  setAlbums,
  setGenres,
  setGenreData,
  setArtistData,
  setAlbumData,
} from "../store/store";
const Main: React.FC = () => {
  const apiUrl = "http://localhost:3001";
  const dispatch = useDispatch();

  //Get Data on Component Mount
  useEffect(() => {
    fetchTotalSongs();
    fetchTotalAlbums();
    fetchTotalArtists();
    fetchTotalGenres();
    getGenreData();
    getArtistData();
    getAlbumData();
  }, []);

  //Interfaces
  interface Genre {
    title: "";
    totalSong: 0;
  }

  interface Artist {
    title: "";
    totalSong: 0;
    totalAlbum: 0;
  }

  interface Album {
    title: "";
    artist: "";
    totalSong: 0;
  }

  //Fetch Data
  const fetchTotalSongs = () => {
    fetch(`${apiUrl}/getAllSongs`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) dispatch(setSongs(res.result.length));
      })
      .catch((err) => {
        console.log("error!");
      });
  };

  const fetchTotalArtists = () => {
    fetch(`${apiUrl}/getDistinctData/Artist`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) dispatch(setArtists(res.result.length));
      })
      .catch((err) => {
        console.log("error!");
      });
  };

  const fetchTotalAlbums = () => {
    fetch(`${apiUrl}/getDistinctData/Album`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) dispatch(setAlbums(res.result.length));
      })
      .catch((err) => {
        console.log("error!");
      });
  };

  const fetchTotalGenres = () => {
    fetch(`${apiUrl}/getDistinctData/Genre`)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) dispatch(setGenres(res.result.length));
      })
      .catch((err) => {
        console.log("error!");
      });
  };

  const getGenreData = () => {
    fetch(`${apiUrl}/getDistinctData/Genre`)
      .then((res) => res.json())
      .then(async (res) => {
        if (!res.error) {
          const genres = res.result;
          const data: any[] = [];
          const promises = genres.map(async (genre: string) => {
            await fetch(`${apiUrl}/getSongsInGenre/${genre}`)
              .then((res) => res.json())
              .then((resp) => {
                if (!resp.error)
                  data.push({ title: genre, totalSong: resp.result.length });
              })
              .catch((err) => {
                console.log("error!");
              });
          });

          await Promise.all(promises);
          dispatch(setGenreData(data));
        }
      });
  };

  const getArtistData = () => {
    fetch(`${apiUrl}/getDistinctData/Artist`)
      .then((res) => res.json())
      .then(async (res) => {
        if (!res.error) {
          const artists = res.result;
          const data: any[] = [];
          const promises = artists.map(async (artist: string) => {
            let albums = 0;
            let songs = 0;
            await fetch(`${apiUrl}/getSongsOfArtist/${artist}`)
              .then((res) => res.json())
              .then(async (res) => {
                if (!res.error) {
                  songs = res.result.length;
                  await fetch(`${apiUrl}/getAlbumsOfArtist/${artist}`)
                    .then((res) => res.json())
                    .then((res) => {
                      if (!res.error) {
                        albums = res.result.length;
                        data.push({
                          title: artist,
                          totalSong: songs,
                          totalAlbum: albums,
                        });
                      }
                    })
                    .catch((err) => {
                      console.log("error");
                    });
                }
              })
              .catch((err) => {
                console.log("err", err);
              });
          });

          await Promise.all(promises);
          dispatch(setArtistData(data));
        }
      });
  };

  const getAlbumData = () => {
    fetch(`${apiUrl}/getDistinctData/Album`)
      .then((res) => res.json())
      .then(async (res) => {
        if (!res.error) {
          const albums = res.result;
          const data: any[] = [];
          const promises = albums.map(async (album: string) => {
            await fetch(`${apiUrl}/getSongsInAlbum/${album}`)
              .then((res) => res.json())
              .then((res) => {
                if (!res.error) {
                  data.push({
                    title: album,
                    artist: res.result[0].Artist,
                    totalSong: res.result.length,
                  });
                }
              })
              .catch((err) => {
                console.log("error");
              });
          });

          await Promise.all(promises);
          dispatch(setAlbumData(data));
        }
      });
  };

  //Components
  const MainDiv = styled.div(
    `width:90%;height:45rem;overflow:auto;background-color:white;margin:2rem auto;border-radius:1rem;padding:1rem`
  );

  const Card = styled.div(
    `width:7rem;height:7rem;border:0.1rem solid black;border-radius:0.3rem;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0.2rem`
  );

  //States
  const totalSongs = useSelector(
    (state: { myReducer: { songs: number } }) => state.myReducer.songs
  );
  const totalArtists = useSelector(
    (state: { myReducer: { artists: number } }) => state.myReducer.artists
  );
  const totalAlbums = useSelector(
    (state: { myReducer: { albums: number } }) => state.myReducer.albums
  );
  const totalGenres = useSelector(
    (state: { myReducer: { genres: number } }) => state.myReducer.genres
  );
  const artistData = useSelector(
    (state: { myReducer: { artistData: any } }) => state.myReducer.artistData
  );
  const genreData = useSelector(
    (state: { myReducer: { genreData: any } }) => state.myReducer.genreData
  );
  const albumData = useSelector(
    (state: { myReducer: { albumData: any } }) => state.myReducer.albumData
  );

  const totalData = [
    { title: "Songs", value: totalSongs },
    { title: "Artists", value: totalArtists },
    { title: "Albums", value: totalAlbums },
    { title: "Genres", value: totalGenres },
  ];

  return (
    <MainDiv>
      <Box
        css={`
          width: 100%;
          min-height: 10rem;
          display: flex;
          justify-content: space-between;
        `}
      >
        {totalData.map((dt) => (
          <Card>
            <h4
              style={{ fontSize: "2.5rem", margin: "0", textAlign: "center" }}
            >
              {dt.value}
            </h4>
            <p style={{ margin: "0" }}>{dt.title}</p>
          </Card>
        ))}
      </Box>

      <Box
        css={`
          width: 100%;
          min-height: 10rem;
          display: grid;
          grid-template-columns: 25% 25% 25% 25%;
        `}
      >
        <h4
          style={{
            margin: "0",
            gridColumn: "1/5",
            textAlign: "left",
            fontSize: "1.3rem",
          }}
        >
          Genres
        </h4>
        {genreData.length > 0 ? (
          genreData.map((dt: Genre) => (
            <Card>
              <h6
                style={{ fontSize: "1.2rem", margin: "0", textAlign: "center" }}
              >
                {dt.title}
              </h6>
              <p style={{ margin: "0" }}>
                {dt.totalSong}
                <small style={{ marginLeft: "0.2rem" }}>Songs</small>
              </p>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", gridColumn: "1/5" }}>
            Fetching Genres...
          </p>
        )}
      </Box>

      <Box
        css={`
          width: 100%;
          min-height: 10rem;
          display: grid;
          grid-template-columns: 25% 25% 25% 25%;
          margin-top: 1rem;
        `}
      >
        <h4
          style={{
            margin: "0",
            gridColumn: "1/5",
            textAlign: "left",
            fontSize: "1.3rem",
          }}
        >
          Artists
        </h4>
        {artistData.length > 0 ? (
          artistData.map((dt: Artist) => (
            <Card>
              <h6
                style={{ fontSize: "1.2rem", margin: "0", textAlign: "center" }}
              >
                {dt.title}
              </h6>
              <p style={{ margin: "0" }}>
                {dt.totalAlbum}
                <small style={{ marginLeft: "0.2rem" }}>Albums</small>
              </p>
              <p style={{ margin: "0" }}>
                {dt.totalSong}
                <small style={{ marginLeft: "0.2rem" }}>Songs</small>
              </p>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", gridColumn: "1/5" }}>
            Fetching Artists...
          </p>
        )}
      </Box>

      <Box
        css={`
          width: 100%;
          min-height: 10rem;
          display: grid;
          grid-template-columns: 25% 25% 25% 25%;
          margin-top: 1rem;
        `}
      >
        <h4
          style={{
            margin: "0",
            gridColumn: "1/5",
            textAlign: "left",
            fontSize: "1.3rem",
          }}
        >
          Albums
        </h4>
        {albumData.length > 0 ? (
          albumData.map((dt: Album) => (
            <Card>
              <h6
                style={{ fontSize: "1.2rem", margin: "0", textAlign: "center" }}
              >
                {dt.title}
              </h6>
              <small>( {dt.artist} )</small>
              <p style={{ margin: "0" }}>
                {dt.totalSong}
                <small style={{ marginLeft: "0.2rem" }}>Songs</small>
              </p>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%", gridColumn: "1/5" }}>
            Fetching Albums...
          </p>
        )}
      </Box>
    </MainDiv>
  );
};

export default Main;
