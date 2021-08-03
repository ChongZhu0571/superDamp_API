// const express = require("express");
// const Cart = require("./../model/cart");
// const authenticateToken = require("./../helpers/verifyToken");
// const authorize = require("./../helpers/authorize");
// const ObjectId = require("mongodb").ObjectID;
import express from "express";
import Cart from "./../model/cart.js";
import authenticateToken from "./../helpers/verifyToken.js";
import authorize from "./../helpers/authorize.js";
// import ObjectId from ("mongodb").ObjectID;
// const { ObjectId } = import("mongodb");
import mongoose from "mongoose";
const ObjectId = mongoose.Schema.Types.ObjectId;

const router = express.Router();

router.get("/", authenticateToken, authorize, async (req, res, next) => {
  try {
    const cartDb = await Cart.find();
    res.send(cartDb);
  } catch (err) {
    next(err);
  }
});

router.get("/myCart", authenticateToken, async (req, res, next) => {
  try {
    const result = await Cart.find({ user: new ObjectId(req.user.sub) });
    console.log(req.params);
    if (!result) {
      return res.status(404).send("No cart with provided user id");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//create
router.post("/", authenticateToken, async (req, res, next) => {
  //   console.log(req.user.);
  try {
    const newCart = new Cart({
      user: req.user.sub,
      ...req.body,
    });
    const result = await newCart.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//delete
router.delete("/myCart", authenticateToken, async (req, res, next) => {
  try {
    const result = await Cart.deleteOne({ user: new ObjectId(req.user.sub) });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

//update
router.patch("/myCart", authenticateToken, async (req, res, next) => {
  try {
    const result = await Cart.updateOne(
      { user: new ObjectId(req.user.sub) },
      {
        user: req.user.sub,
        ...req.body,
      }
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// module.exports = router;
export default router;
