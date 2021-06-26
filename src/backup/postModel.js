const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  timeStart: { type: Date, require: true },
  timeEnd: { type: Date, require: true },
  typePost: Number,
  status: Number,
  accommodation: {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: [String],
      require: true,
    },
    address: {
      street: String,
      ward: String,
      district: String,
      province: String,
    },
    retail: {
      type: Number,
      require: true,
    },
    images: {
      type: [Object],
      require: true,
    },
    area: { type: Number, require: true },
    typeAccommdation: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
