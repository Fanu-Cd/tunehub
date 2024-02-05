const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    Artist: { type: String, required: true },
    Album: { type: String, required: false },
    Genre:{ type: String, required: false }
  },
  { collection: "song" }
);

const Song = mongoose.model("Song", songSchema);
module.exports = Song;
