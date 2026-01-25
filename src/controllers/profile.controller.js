import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate("projects")
    .select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "Profile not found");
  }

  return res.json(new ApiResponse(200, user, "Profile fetched successfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    req.body,
    { new: true }
  )
    .populate("projects")
    .select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "Profile not found");
  }

  return res.json(new ApiResponse(200, user, "Profile updated successfully"));
});