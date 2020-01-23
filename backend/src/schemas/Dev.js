import mongoose from 'mongoose';
// import {model, Schema} from 'mongoose';

const DevSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    bio: String,
    avatar: {
      type: String,
      required: true,
    },
    likes: [
      // colchete referencia varios devs
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
    dislikes: [
      // colchete referencia varios devs
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dev',
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Dev', DevSchema);
