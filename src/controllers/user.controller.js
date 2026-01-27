import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../models/project.model.js";

const options = {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/"          // 👈 VERY IMPORTANT
};



const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };

  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};



export const registerUser = asyncHandler(async (req, res) => {

  const user = await User.create(req.body);

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    return res.status(500).json(
      new ApiError(500, "Something went wrong while registering the user")
    );
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(createdUser._id);

  // set cookies
  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
  return res.status(201).json(
    new ApiResponse(createdUser, "User registered successfully")
  );
});


export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(new ApiError(401, "Invalid password"));
  }

  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  res
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options);

  return res.status(200).json(
    new ApiResponse(loggedInUser, "Login successful")
  );
});



export const refreshAccessToken = asyncHandler(async (req, res) => {

  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    return res.status(401).json(new ApiError(401, "Refresh token missing"));
  }

  const user = await User.findOne({ refreshToken });

  if (!user) {
    return res.status(401).json(new ApiError(401, "Invalid refresh token"));
  }

  const newAccessToken = user.generateAccessToken();

  res.cookie("accessToken", newAccessToken, options);

  return res.json(
    new ApiResponse({}, "Access token refreshed")
  );
});



export const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: null }
  });

  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken");

  return res.json(
    new ApiResponse({}, "Logged out successfully")
  );
});



export const updateUserById = asyncHandler(async (req, res) => {

  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  ).select("-password -refreshToken");

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  return res.json(
    new ApiResponse(user, "User updated")
  );
});


export const deleteUserById = asyncHandler(async (req, res) => {

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json(new ApiError(404, "User not found"));
  }

  return res.json(
    new ApiResponse({}, "User deleted")
  );
});