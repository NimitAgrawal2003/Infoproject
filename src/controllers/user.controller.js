import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// REGISTER
export const registerUser = asyncHandler(async (req, res) => {

  const user = await User.create(req.body);

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    return res.status(500).json(
      new ApiError(500, "Something went wrong while registering the user")
    );
  }

  return res.status(201).json(
    new ApiResponse(createdUser, "User registered successfully")
  );
});


// LOGIN
export const loginUser = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json(
      new ApiError(404, "User not found")
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    return res.status(401).json(
      new ApiError(401, "Invalid password")
    );
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  return res.status(200).json(
    new ApiResponse(
      {
        user,
        accessToken,
        refreshToken
      },
      "Login successful"
    )
  );
});
