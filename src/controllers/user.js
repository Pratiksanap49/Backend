import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
//import {ApiResponse} from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async (req , res ) => {
     
    const { fullName, username, email, password } = req.body;
    console.log(email)

    if(
        [fullName, username, email, password].some((field) =>
             field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required"); 
    }

    const existedUser = await User.findOne({
        $or: [{ username} , { email }]
    })

    if (existedUser) {
        throw new ApiError(400, "Username or email already exists");
        
    }

    
    const avatarLocalPath= req.files?.avatar[0]?.path;
    // console.log("Avatar path:", avatarLocalPath);
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

   const avatar =  await uploadOnCloudinary(avatarLocalPath);
//    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

   if (!avatar) {
        throw new ApiError(500, "Failed to upload avatar");
    }

    // if (!coverImage) {
    //     throw new ApiError(500, "Failed to upload cover image");
    // }

    let coverImage;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // ✅ safe optional access
        email,
        password,
        username: username.toLowerCase()
    });

    const createdUser = await User.findOne({ email }).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Failed to create user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );

})

export {registerUser}

