import User from "../models/user.model.js";

//Update
export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, isAdmin, ...other } = updatedUser._doc;
    res.status(200).json({ ...other });
  } catch (err) {
    next(err);
  }
};

//Delete
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted successfully");
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const singleUser = await User.findById(req.params.id);
    const { password, isAdmin, ...other } = singleUser._doc;
    res.status(200).json({ ...other });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
