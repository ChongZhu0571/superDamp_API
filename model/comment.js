// const mongoose = require("mongoose");
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User", // Reference to some User
    },
    product: {
      type: ObjectId,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    comments: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

commentSchema.set("autoIndex", true);

// module.exports = mongoose.model("Cart", cartSchema);
export default mongoose.model("Comment", commentSchema);
