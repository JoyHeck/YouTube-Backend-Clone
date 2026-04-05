import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"
const registerUser = asyncHandler(async (req, res) => {


  // Get user details from frontend
  const { fullName, email, username, password } = req.body;
  // console.log("Email: ", email);

  // Validation to check whether its empty or not
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "Full Name is required.");
  }

  // Whether the user existes or not
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User With this email or username already exists.");
  }
  // Check for images and avatar
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar File is required.");
  }

  // image upload to cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath.replace(/\\/g, "/"));
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) { // only avatar is required
    throw new ApiError(400, "Avatar File is required.");
  }

  // create user object - create entry in db

  const user = await User.create({
    fullName,
    avatar: avatar?.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase() 
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  if(!createdUser){
    throw new ApiError(500, "Something Went Wrong while registeration.")
  }

  return res.status(201).json(
    new ApiResponse(200, createdUser, "User Registered Successfully")
  )
});


export { registerUser };
