import { createSlice, configureStore } from "@reduxjs/toolkit";

const mySlice = createSlice({
  name: "mySlice",
  initialState: {
    songs: 0,
    artists: 0,
    albums: 0,
    genres: 0,
    songData: [],
    genreData: [],
    artistData: [],
    albumData: [],
  },
  reducers: {
    setSongData: (state, action) => {
      state.songData = action.payload;
    },
    setGenreData: (state, action) => {
      state.genreData = action.payload;
    },
    setArtistData: (state, action) => {
      state.artistData = action.payload;
    },
    setAlbumData: (state, action) => {
      state.albumData = action.payload;
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setArtists: (state, action) => {
      state.artists = action.payload;
    },
    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
  },
});

export const {
  setSongData,
  setSongs,
  setArtists,
  setAlbums,
  setGenres,
  setGenreData,
  setArtistData,
  setAlbumData,
} = mySlice.actions;
const store = configureStore({
  reducer: {
    myReducer: mySlice.reducer,
  },
});

export default store;
