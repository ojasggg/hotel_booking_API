import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.send("This is Login Route");
});

router.get("/register", (req, res) => {
  res.send("This is register Route");
});

export default router;
