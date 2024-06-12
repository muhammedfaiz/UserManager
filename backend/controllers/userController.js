import asyncHandler from "express-async-handler";
import generateWebToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import fs from 'fs';
import path from 'path';
// @desc Auth user/set token
// route POST /api/users/auth
// @access PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPasswords(password))) {
    generateWebToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
      isAdmin:user.isAdmin
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Auth user/register
// route POST /api/users
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.filename : null;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
    image,
  });
  if (user) {
    generateWebToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      image: user.image,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Auth user/logout
// route POST /api/users/logout
// @access PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out" });
});

// @desc Get user profile
// route POST /api/users/profile
// @access PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json({ user });
});

// @desc update user profile
// route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const image = req.file ? req.file.filename : null;
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (image) {
      const oldImage = path.join(path.resolve(),'backend/uploads',user.image);
      fs.unlink(oldImage,(err)=>{
        if(err){
          console.log(err);
        }
      })
      user.image = image;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image:updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  logoutUser,
  updateUserProfile,
};
