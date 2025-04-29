import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


// Configuration
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const UploadOnCloudinary = async (localStoragePath) => {
    try {
        if(!localStoragePath){
            return null;
        }
        const response = await cloudinary.uploader.upload(localStoragePath,{
            resource_type:"auto"
        })

        console.log("File has uploaded on cloudinary",response.url);
        fs.unlinkSync(localStoragePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localStoragePath)   //remove the locally stored temporary file as the upload operation got failed
        return null;
    }
   
}

export {UploadOnCloudinary}