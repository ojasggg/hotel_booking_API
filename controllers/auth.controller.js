import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      age: req.body.age,
      password: req.body.password,
    });
    await newUser.save();
    res
      .status(200)
      .json({
        success: true,
        message: "User has been created successfully",
        newUser,
      });
  } catch (error) {
    next(error);
  }
};
