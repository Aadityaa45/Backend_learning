import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const VideoSchema = new Schema(
    {
        videofile:{
            type:String, //cloudnary se aayegi bhai file 
            required:true
        },
        thumbnail:{
            type:String, //cloudnary se aayegi bhai file 
            required:true
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true,
        },
        views:{
            type:Number,
            required:true,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }

        
    },
    {
        timestamps:true,
    }
)
VideoSchema.plugin(mongooseAggregatePaginate)
export const video = mongoose.model("Video",VideoSchema)