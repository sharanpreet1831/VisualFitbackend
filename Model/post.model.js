import mongoose from "mongoose";
import { User } from "./user.model";

const postschema = new mongoose.Schema({
    userId :{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        require :true 

    },
    title : {
        type : String,
        required : true
    }, 
    image :[String],
    likeCount :{
        type : Number ,
        default : 0 ,

    },
    commentCount :{
       type : mongoose.Schema.Types.ObjectId,
       ref : "Commnet"

    }
},{timestamps:true})

export const Post = mongoose.model("Post", postschema)