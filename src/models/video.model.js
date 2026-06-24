// video model from the fiven eraser link for model structure for videotube 
// https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj

import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"



const videoSchema=new Schema({

    videoFile:{
        type:String, // cloudinary url 
        required:true,
    },
    thumbnail:{
        type:String, // cloudinary url 
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    title:{
        type:String, 
        required:true,
    },
    description:{
        type:String, 
        required:true,
    },
    duration:{
        type:Number,  // ye bhi cloudinary se hi aayega , jaise hi hum video(file) upload karenge toh vo sari details de dega like , time, url,duration etc 
        required:true,
    },
    views:{
        type:Number, 
        default:0
    },
    isPublished:{
        type:Boolean, 
        default:true,
    },

},
{timestamps:true /* for createdAt and updatedAt */}
)

videoSchema.plugin(mongooseAggregatePaginate)  // ab hum aggregation queries bhu likh sakte hai

export const Video=mongoose.model("Video",videoSchema);

/*

--->  hum log basic mongo db query toh likhenge hi like insert many , update many etc 
but we also use this spacial package 
A page based custom aggregate pagination library for Mongoose with customizable labels.



Installation
npm install mongoose-aggregate-paginate-v2

ye humko allow karta hai "aggregation query" likhne ke liye 

read about aggregation pipeline framework inside mongo 

The aggregation pipeline in MongoDB is a powerful framework for data aggregation and transformation. It consists of multiple stages, each performing a specific operation on the input documents. The output of one stage becomes the input for the next stage, allowing for complex data processing and analysis.

suppose your database has 1000 users if i do User.aggregate([...])
then MongoDB will return all 1000 users at once 
Imagine showing all 1000users on a website page . it would be slow and unneccessary 

instead website usually show 
--> Page 1 --> User 1-10
--> Page 2 --> User 10-20
--> Page 3 --> User 21-30

this is called pagination 

think of YouTube search results 
when we search a video . YouTube does'nt show millions of videos at once , instead it shows 
page -> 1->20 videos 
next page ->20 more videos 

aggregate() -> process/filter data
paginate() --> shows data page by page 
aggregatePaginate() -> process/filter data and show it page by page 


Note --> A plugin is reusable code that adds extra functionality to a mongoose schema , and mongoose-aggregate
-paginate-v2 adds the aggregatePaginate() method so you can easily paginate aggregation results 

further read in mongoose aggregation and abut this dependency also 



*/