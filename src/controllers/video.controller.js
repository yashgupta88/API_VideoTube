// video upload from channel
// upfate details like thumbnail,title,description etc
// delete video 

/**
 * uploadVideo
getAllVideos (with pagination, search, and sorting)
getVideoById
updateVideo
updateVideoThumbnail
deleteVideo
 */

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

const uploadVideo = asyncHandler (async (req , res)=>{


    const {title , description , isPublished} = req.body

    if([title , description ] . some((field)=> !field || field.trim()==="")){
        throw new ApiError(400 , "All fields required")
    }

    const videoFilePath=req.files?.videoFile?.[0]?.path

    if(! videoFilePath){
        throw new ApiError(400 , "video file is required")
    }
    const thumbnailFilePath=req.files?.thumbnail?.[0]?.path

    if(! thumbnailFilePath){
        throw new ApiError(400 , "thumbnail file is required")
    }

    const videoFile =await  uploadOnCloudinary(videoFilePath)
    const thumbnail =await uploadOnCloudinary(thumbnailFilePath)

    if(!videoFile){
        throw new ApiError(500,"Internal error while uploading videoFile")
    }

    if(!thumbnail){
        throw new ApiError(500,"Internal error while uploading thumbnail")
    }

    const video =await Video.create({
        title,
        description,
        isPublished,
        videoFile: {
            url: videoFile.url,
            public_id: videoFile.public_id
        },
        thumbnail:{
            url:thumbnail.url,
            public_id:thumbnail.public_id
        } ,
        duration: videoFile.duration,
        owner:req.user._id,
        views:0


    })

    if(! video ){
        throw new ApiError(500, "Something went wrong while uploading video");
    }

    return res.status(201).json(
        new ApiResponse(200,video,"video uploaded successfully ")
    )

})

const getVideoById = asyncHandler(async(req,res)=>{
    // video id is coming from url 
    const {videoId}=req.params

    const video=await Video.aggregate([
        {
            $match:{
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"owner",
                foreignField:"_id",
                pipeline:[
                    {
                       $project:{
                        username:1,
                        _id:1,
                        fullName:1,
                        avatar:1
                       }
                    }
                ],
                as:"videoUploader"
            },
            
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"owner",
                foreignField:"channel",
                as:"subscribers"
            }
        },
       
        {
            $addFields:{
                owner:{
                    $first:"$videoUploader"
                },
                subscriberCount:{
                    $size:"$subscribers"
                },
                isSubscribed:{
                $cond:{
                    if:{
                        $in:[req.user._id,"$subscribers.subscriber"]
                    },
                    then:true,
                    else:false
                }
                }
            }
        },
        {
            $project:{
                videoFile:1,
                thumbnail:1,
                owner:1,
                title:1,
                description:1,
                duration:1,
                views:1,
                isPublished:1,
                subscriberCount:1,
                isSubscribed:1


            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200,video[0],"video fetched Successfully")
    )
})



export {uploadVideo ,
    getVideoById
}