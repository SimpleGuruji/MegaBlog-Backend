import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    featuredimage: {
      type: String, // cloudinary url
      required: true,
    },

    status: {
      type: String,
      index: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

export const Post = mongoose.model("Posts", postSchema);
