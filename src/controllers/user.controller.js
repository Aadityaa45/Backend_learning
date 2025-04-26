import AsyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";




const registerUser = AsyncHandler(async (req,res) =>{
    

    //steps to do 

    /* Get user details from frontend
    validation such as fields are not empty or the input is desired
    check if user already exists
    check for images check for avatar
    upload them to cloudinary
    create user object-create entry inn db 
    remove password and refresh token field from response 
    check for user creation
    return response */


    const {fullName,email,username,password}  = req.body;

    //writing validations

    if(fullName === "" || email==="" || username==="" || password===""){
    throw new ApiError(404,"All field are required")
    }
    console.log(`Email:${email}`);


    const IsExistUser = await User.findOne(
        {
            $or:[{username},{email}]
        }
    )

    console.log(IsExistUser)

    if(IsExistUser){
        throw new ApiError(408,"User already exist")
    }


    const avatarLocalPath = req.files?.Avatar[0]?.path  
    // Get the local file path of the uploaded avatar image (if exists) using optional chaining
// req.files?.avatar[0]?.path safely accesses the first avatar file's path

    const coverImgLocalPath = req.files?.CoverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }   


    //now using the clodnianry upload utils we are uploading the fetched localPtah storage to the db 

    const avatar = await UploadOnCloudinary(avatarLocalPath);
    const cover = await UploadOnCloudinary(coverImgLocalPath);


    if(!avatar){
        throw new ApiError(400,"Cover image is failed to upload ")
    }

   const user = await User.create({
        fullName,
        avatar : avatar.url,
        coverimage:cover?.url  || "",
        email,
        password,
        username:username.toLowerCase(),

    })


    //checking for user creation and emoving password and refreshtoken

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken"   //this - syntax tells that remove this field in return  initally everything is selected 
    )

    if(!CreatedUser){
        throw new ApiError(500,"User is not created, something went wrongh ")
    }

    return res.status(201).json(
        new ApiResponse(201,CreatedUser,"User successfully registered")
    )
})


export {registerUser}