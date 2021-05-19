import mongoose, { Schema } from 'mongoose';

import IPost from '../interface/post.interface';

const PostSchema = new Schema({
  timeStart: { type: Date, require: true },
  timeEnd: { type: Date, require: true },
  typePost: Number,
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
    typeAccommdation: Number,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
});

const Post = mongoose.model<IPost>('Post', PostSchema);

export default Post;
