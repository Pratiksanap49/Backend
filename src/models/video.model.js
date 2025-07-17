import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


videoSchema.plugin(mongooseAggregatePaginate)

const videoSchema = new Schema(
    {

        videofile: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        view: {
            type: Number,
            default: 0
        },
        ispublished: {
            type: Boolean,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId ,
            ref:"User"
        },

    }
,{timestamps:true})

export const video = mongoose("Video",videoSchema)