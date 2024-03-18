import mongoose from "mongoose";
import shortid from "shortid";

const urlSchema = new mongoose.Schema(
    {
        fullURL:{
            type:String,
            required:true,
        },
        shortID:{
            type:String,
            required:true,
        },
        note:{
            type:String,
            sparse:true,
        }
    },
    {timestamps: true}
)

export default mongoose.model('shortURL',urlSchema)