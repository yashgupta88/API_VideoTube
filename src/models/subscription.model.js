import mongoose from "mongoose"

const subscriptionSchema= new mongoose.Schema({
    subscriber : {  // subscriber bhi user hi hoga  
        type: mongoose.Schema.Types.ObjectId, // (one who is subscribing )
        ref:"User",
       
    },
    channel : {  // channel bhi kisi user ka hi hoga 
        type: mongoose.Schema.Types.ObjectId,  // one two whom subscriber is subscribing 
        ref:"User",
      
    }
},
{timestamps:true})

export const Subscription= mongoose.model("Subscription",subscriptionSchema)
