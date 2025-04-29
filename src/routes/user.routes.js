import { Router } from "express";
import { LoginUser, LogoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middelwares/multer.middelware.js";
import { verifyJWT } from "../middelwares/auth.middelware.js";


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


router.route("/login").post(LoginUser)

router.route("/logout").post(verifyJWT,LogoutUser)  //yaad kar jab bbi middelware banate h to usme apan next bhi rakhte h vo next isko batane ke liye ki jab middelware execute hojaye to uske next me konsa method execute karna h 



export default router;