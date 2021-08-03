// const express = require("express");
// const Product = require("./../model/product");
// const authenticateToken = require("./../helpers/verifyToken");
// const authorize = require("./../helpers/authorize");
import express from "express";
import Product from "./../model/product.js";
import authenticateToken from "./../helpers/verifyToken.js";
import authorize from "./../helpers/authorize.js";

const router = express.Router();

//get all
router.get("/", async (req, res, next) => {
  try {
    const productDb = await Product.find();
    res.send(productDb);
  } catch (err) {
    next(err);
  }
});

//find by category T-Shirts
router.get("/T-Shirts/", async (req, res, next) => {
  try {
    const result = await Product.find({ category: "T-Shirts" });
    if (!result[0]) {
      return res.status(404).send("No T-Shirts available");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//find by category Hoodies
router.get("/Hoodies/", async (req, res, next) => {
  try {
    const result = await Product.find({ category: "Hoodies" });
    if (!result[0]) {
      return res.status(404).send("No Hoodies available");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//find by category Jackets
router.get("/Jackets/", async (req, res, next) => {
  try {
    const result = await Product.find({ category: "Jackets" });
    if (!result[0]) {
      return res.status(404).send("No Jackets available");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//find by category Pants
router.get("/Pants/", async (req, res, next) => {
  try {
    const result = await Product.find({ category: "Pants" });
    if (!result[0]) {
      return res.status(404).send("No Pants available");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//find by id
router.get("/:id", async (req, res, next) => {
  try {
    const result = await Product.findById(req.params.id);
    if (!result) {
      return res.status(404).send("Wrong product id");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//create
router.post("/", authenticateToken, authorize, async (req, res, next) => {
  try {
    const newProduct = new Product({
      ...req.body,
    });
    const result = await newProduct.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//delete
router.delete("/:id", authenticateToken, authorize, async (req, res, next) => {
  try {
    const targetProduct = await Product.findById(req.params.id);
    if (!targetProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const result = await Product.findByIdAndDelete({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

//update
router.patch("/:id", authenticateToken, authorize, async (req, res, next) => {
  try {
    const targetProduct = await Product.findById(req.params.id);
    if (!targetProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const result = await Product.updateOne(
      { _id: req.params.id },
      {
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
