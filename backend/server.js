const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const port = 3001;
const app = express();
const cors = require("cors");
const Song = require("./models/song");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const mongodburl =
  "mongodb+srv://fanu0925:mongodb_fanu0925RG@cluster0.uvyfcr8.mongodb.net/Tunehub";
mongoose
  .connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

//get all songs
app.get("/getAllSongs", (req, response) => {
  Song.find({})
    .then((res) => response.json({ result: res }))
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//add song
app.post("/addNewSong", (req, response) => {
  const { title, artist, album, genre } = req.body;
  const newSong = new Song({
    Title: title,
    Artist: artist,
    Album: album,
    Genre: genre,
  });

  newSong
    .save()
    .then((res) => {
      response.json({ success: true });
    })
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//update song
app.post("/updateSong",(req,response)=>{
  const {oldTitle,newTitle,artist,album,genre}=req.body
  Song.findOneAndUpdate({Title:oldTitle},{Title:newTitle,Artist:artist,Album:album,Genre:genre}).then(res=>{response.json({result:res})}).catch(err=>{response.json({error:true,errorMessage:err})})
})

//delete song
app.post("/deleteSong",(req,response)=>{
  const {title}=req.body
  Song.deleteOne({Title:title}).then(res=>{response.json({result:res})}).catch(err=>{response.json({error:true,errorMessage:err})})
})

//to get total number of artists, albums, and genres
app.get("/getDistinctData/:type", (req, response) => {
  const type = req.params.type;
  Song.distinct(type)
    .then((res) => response.json({ result: res }))
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//get number of songs in every genre
app.get("/getSongsInGenre/:genre", (req, response) => {
  const Genre = req.params.genre;
  Song.find({ Genre: Genre })
    .then((res) => response.json({ result: res }))
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//get number of songs for each artist
app.get("/getSongsOfArtist/:artist", (req, response) => {
  const Artist = req.params.artist;
  Song.find({ Artist: Artist })
    .then((res) => response.json({ result: res }))
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//get number of songs in every album
app.get("/getSongsInAlbum/:album", (req, response) => {
  const Album = req.params.album;
  Song.find({ Album: Album })
    .then((res) => response.json({ result: res }))
    .catch((err) => {
      response.json({ error: true, errorMessage: err });
    });
});

//get number of albums of every artist
app.get("/getAlbumsOfArtist/:artist", (req, response) => {
  const Artist = req.params.artist;
  Song.distinct('Album',{Artist:Artist}).then((res) => {response.json({result:res})}).catch(err=>response.json({error:true,errorMessage:err}))
});

app.listen(port, () => {
  console.log(`Server Listening on Port ${port}`);
});
