// const mongoose = require("mongoose");
// const validator = require("validator");
// const bcrypt = require("bcryptjs");
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    role: {
      type: String,
      default: "user", //admin
      required: [true, "Please provide a role!"],
    },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

// module.exports = mongoose.model("User", userSchema);
export default mongoose.model("User", userSchema);
