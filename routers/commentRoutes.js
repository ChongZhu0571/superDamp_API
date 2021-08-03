import express from "express";
import Product from "./../model/product.js";
import Comment from "./../model/comment.js";
import authenticateToken from "./../helpers/verifyToken.js";
import authorize from "./../helpers/authorize.js";

const router = express.Router();

//get all
router.get("/", async (req, res, next) => {
  try {
    const commentDb = await Comment.find();
    res.send(commentDb);
  } catch (err) {
    next(err);
  }
});

//get by product
router.get("/product/:id", async (req, res, next) => {
  try {
    const result = await Comment.find({ product: req.params.id });
    if (!result) {
      return res.status(404).send("Wrong product id");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//get by user
router.get("/user/:id", authenticateToken, async (req, res, next) => {
  try {
    const result = await Comment.find({ user: req.params.id });
    if (!result) {
      return res.status(404).send("Wrong user id");
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
});

//add comment
router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const result = await Product.find({ _id: req.body.product });
    if (!result) {
      return res.status(404).send("Wrong product id");
    }
    const newComment = new Comment({
      user: req.user.sub,
      product: req.body.product,
      comments: { ...req.body.comments },
    });
    const addResult = await newComment.save();
    res.send(addResult);
  } catch (err) {
    next(err);
  }
});

//delete
router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const result = await Comment.findByIdAndDelete({ _id: req.params.id });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

//update
router.patch("/:id", authenticateToken, async (req, res, next) => {
  try {
    const targetComment = await Comment.findById(req.params.id);
    if (!targetComment) {
      return res.status(404).json({ msg: "Comment not found" });
    }
    const result = await Comment.updateOne(
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
