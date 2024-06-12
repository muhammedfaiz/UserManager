import User from "../models/userModel.js";
import fs from "fs";
import path from "path";
// dashboard of admin

const dashboard = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404);
    throw new Error("Users not found");
  }
};

const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (user.image) {
      const oldImage = path.join(path.resolve(), "backend/uploads", user.image);
      fs.unlink(oldImage, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    const remove = await User.deleteOne({ _id: id });
    if (remove.acknowledged) {
      const users = await User.find();
      res.status(200).json(users);
    }
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    res.status(200).json(user);
  } catch (error) {
    res.status(404);
    throw new Error("Users not found");
  }
};

const editUser = async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;
  const image = req.file ? req.file.filename : null;
  console.log(name);
  const user = await User.findOne({ _id: id });
  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    if (image) {
      const oldImage = path.join(path.resolve(), "backend/uploads", user.image);
      fs.unlink(oldImage, (err) => {
        if (err) {
          console.log(err);
        }
      });
      user.image = image;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

export { dashboard, removeUser, getUser, editUser };
