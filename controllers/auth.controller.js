import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/createError.js";
import jsonwebtoken from "jsonwebtoken";

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
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User Not Found"));
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect)
      return next(createError(404, "Invalid Credentials"));

    const token = jsonwebtoken.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY
    );
    const { password, isAdmin, ...other } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...other });
  } catch (error) {
    next(error);
  }
};
