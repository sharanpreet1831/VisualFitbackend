import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    username:{
        type : String ,
        required : true 
    },
    avatar :{
        type :String ,
        required : true 
    }, 
    bio : {
        type :String 
    }

},{timestamps:true})

export const User = mongoose.model("User",userschema)