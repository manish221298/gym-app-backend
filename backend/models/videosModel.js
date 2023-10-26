const mongoose = require("mongoose");

const videoModel = mongoose.Schema(
  {
    title: { type: String, trim: true },
    description: { type: String },
    videos: { type: String },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoModel);

module.exports = Video;
