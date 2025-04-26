import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        index:true  //basically yeh index true kisi bhi field ki searching ko easy banata h database me jaha bhi aapko lage ki yeh bahut jyada search hoga vaha aap dekh sakte ho index true karke 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        //index:true  //basically yeh index true kisi bhi field ki searching ko easy banata h database me jaha bhi aapko lage ki yeh bahut jyada search hoga vaha aap dekh sakte ho index true karke 
    },
    Fullname:{
        type:String,
        required:true,
        trim:true,
        index:true  //basically yeh index true kisi bhi field ki searching ko easy banata h database me jaha bhi aapko lage ki yeh bahut jyada search hoga vaha aap dekh sakte ho index true karke 
    }, 
    avatar:{
        type:String,//yaha clounarry ki string lagegi means third party platform pe store hoga avatar
        required:true,
    },
    coverimage:{
        type:String,
        required:false,
    },
    watchhostory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true,
}
)

UserSchema.pre("save",async function (next){  //here pre means just before saving the information in databse activate this hook
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)  //yeh jo hash function h yeh do chije leta h ek to kya karna h or kitne round of algorithm lagane h 
        next()
    }
    else{
        return next();
    }
    
})
//here we dont use arrow function because in arrow function we doesnt have the access of the "this" keyword and here we use it thats why we are going with a simple function here by passing the next flag
//here pre is a middelware hook


UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)   //this compare method always return true or false 
}



// UserSchema.methods.generateRefreshToken = async function(){
// //     🔏 jwt.sign() = turns user info into a secure token you can send to clients.
// // Only your backend knows how to make or verify it using your secret
//    return jwt.sign({    //Basically, it takes your data (called "payload") and signs it with a secret key, so no one can tamper with it.
//         _id : this._id

//     }),
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
//     }
// }
UserSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

// UserSchema.methods.generateAccessToken = async function(){
//     return jwt.sign({    //Basically, it takes your data (called "payload") and signs it with a secret key, so no one can tamper with it.
//         _id : this._id,
//         email:this.email,
//         username:this.username,
//         fullname : this.Fullname
//     }),
//     process.env.ACCESS_TOKEN_SECRET,
//     {
//         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//     }
// }
UserSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.Fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model("User",UserSchema);



//jwt token is a bearer token that measn agar yeh token kisi ke pass bhi hoga use me data de dunga 

//lets explore about refresh token and access tokens

// How they work together (Real-world flow):
// ✅ You login

// 🔄 Server sends:

// Access Token (short life)

// Refresh Token (long life)

// ✅ You use the Access Token for API requests

// ⌛ Access token expires

// 🔁 Client sends the Refresh Token to the server

// 🔄 Server verifies and gives you a new Access Token



