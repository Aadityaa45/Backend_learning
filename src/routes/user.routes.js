import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middelwares/multer.middelware.js";


const router = Router();


router.route("/register").post(    //this is how "upload" middelware is injected to deal with file uploads 
    upload.fields([
        {
            name:"Avatar",
            maxCount:1
        },
        {
            name:"CoverImage",
            maxCount:1
        }
    ]),
    registerUser)



export default router;