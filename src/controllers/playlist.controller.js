import { Playlist } from "../models/playlist.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Video } from "../models/video.model.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2.js";

const createPlaylist = asyncHandler(async(req , res)=>{

    const {name,description,videos} = req.body

    if( ! name?.trim() || ! description?.trim()){
        throw new ApiError(400,"All Fields Are Required")
    }


    for(let i=0; i<videos.length ; i++){
        if( ! mongoose.Types.ObjectId.isValid(videos[i])){
            throw new ApiError(400 , "Invalid Video Id ")
        }

        const video=await Video.findById(videos[i])
        if(! video){
            throw new ApiError(400,"Video not Found")
        }
    }

    const playlist= await Playlist.create({
        name:name,
        description:description,
        videos:videos,
        owner:req.user._id
    })

    return res.status(200).json(new ApiResponse(200,playlist,"Playlist Created SuccessFully"))
})