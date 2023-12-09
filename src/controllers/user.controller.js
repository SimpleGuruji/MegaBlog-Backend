import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  const user = await User.create({ fullName, email, password });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "User created Successfully",
        await user.generatetoken()
      )
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });

  if (!user && !(await user.isPasswordCorrect(password))) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const jwtToken = await user.generatetoken();

  res.status(200).cookie("token", jwtToken, { httpOnly: true });

  res
    .status(200)
    .json(new ApiResponse(200, "User logged in Successfully", jwtToken));
});

export { registerUser, loginUser };
