import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
      password: hash,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "User has been created successfully",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  res.send("This is Login page");
};
