import mongoose from "mongoose";

const followschema = new mongoose.Schema({
    followerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    followedId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
},{timestamps : true})

export const Follow = mongoose.model("Follow", followschema)