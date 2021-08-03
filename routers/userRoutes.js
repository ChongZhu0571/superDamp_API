// const express = require("express");
// const User = require("./../model/user");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const authenticateToken = require("./../helpers/verifyToken");
// const ObjectId = require("mongodb").ObjectID;
import express from "express";
import User from "./../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authenticateToken from "./../helpers/verifyToken.js";
// import ObjectId from ("mongodb").ObjectID;
// const { ObjectId } = import("mongodb");
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

// require("dotenv").config();

const router = express.Router();

//login
router.get("/login", async (req, res, next) => {
  authenticate(req.body)
    .then((user) =>
      user
        ? res.send(user)
        : res.status(400).json({ message: "Username or password is incorrect" })
    )
    .catch((err) => next(err));
});

async function authenticate({ email, password }) {
  const user = await User.findOne({ email: email });
  console.log(user);
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { sub: user._id, role: user.role, name: user.name },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" }
    );
    const { _id, name, email } = user;
    return {
      _id,
      name,
      email,
      token,
    };
  } else return null;
}

//register
router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await newUser.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//reset info
router.put("/reset", authenticateToken, async (req, res, next) => {
  try {
    let { name, email, password } = req.body;
    // find the element
    let result = await User.findOneAndUpdate(
      { _id: new ObjectId(req.user.sub) },
      { name, email, password }
    );
    if (!result) {
      return res.status(401).send("Wrong id");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

// module.exports = router;
export default router;
