import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoschema = new Schema (
    {
        videoFile:{
            type: String, // Cloudinary URL
            required: true
        },
        thumbnail:{
            type: String, // Cloudinary URL
            required: true
        },
        title:{
            type: String, 
            required: true,
            index: true,
        },
        description:{
            type: String,
            required: true
        },
        duration:{
            type: number, // cloudinary URL
            required: true
        },
        views:{
            type: Number, 
            default: 0
        },
        isPublished:{
            type: Boolean, 
            default: true
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps : true
    }
)

videoschema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.Aggregate.apply.model("Video", videeoschema)