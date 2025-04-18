import mongoose,{Schema} from "mongoose"

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
            type:Schema.types.ObjectId,
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


export const User = mongoose.model("User",UserSchema);

