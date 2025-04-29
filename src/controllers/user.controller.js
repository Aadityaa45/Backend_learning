import AsyncHandler from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudnary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const GenerateAccesandRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId);
        const AccesToken = user.generateAccessToken();
        const RefreshToken = user.generateRefreshToken();


        //now we have t save the refresh token in our database 
        //we have refresh token property in our model so accessing it and updating it with the stored refrsh token 

        user.refreshToken= RefreshToken;
        //now we have to save it 
        await user.save({validateBeforeSave:false})

        return{AccesToken,RefreshToken}
    } catch (error) {
        throw new ApiError(500,"Something went wroong in generating access and refresh token")
    }


}

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


    //creating anew User entry in database 

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


const LoginUser = AsyncHandler(async (req,res) => {
    //To do's
    //we have to get data from request body
    //check for email or username 
    //find the user 
    //password check
    //access and refresh token 


    const {email,username,password} = req.body;

    if(!username && !email){
        throw new ApiError(404,"You should have emial or username to login")
    }

    const user = await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(404,"User does not exist")
    }

    const ispasswordvalid = await user.isPasswordCorrect(password)

    if(!ispasswordvalid){
        throw new ApiError(404,"wrong password")
    }

    const {refreshToken,AccesToken} = await GenerateAccesandRefreshToken(user._id)


    //now we have to send cookies and inforation but along with thaat we dont have to shae password with the user 
    //remember one thing the user varibale we are using to store the data to of the User is not updated when we called the generate access and refresh token method so we have to update it 
    //we can do it by two ways
    //1. implement a find query and the updated data will be returned to the user
    //2. just update it without finding the user



    const LoggedinUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly:true,
        secure:true
    }


    return res.status(200)
    .cookie("refreshToken",refreshToken,options)
    .cookie("AccesToken",AccesToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:LoggedinUser,refreshToken,AccesToken
            },
            "user logged in succesfully"
        )
    )

})

const LogoutUser = AsyncHandler(async (req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("AccesToken",options)
    .json(
        new ApiResponse(200,{},"user logged out ")
    )
})


export {registerUser,LoginUser,LogoutUser}