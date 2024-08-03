import mongoose from "mongoose";

const courseschema=new mongoose.Schema({
    courseName:{
        type:String
    },
    coursedescription:{
        type:String
    },
    whatYouWillLearn:{
        type:String
    },
    price:{
        type:Number
    },
    category:{
        type:String,
        ref:"Category"
    },
    courseContent:[
        {
            type:String,
            ref:"Section"
        }
    ],
    ratingandreview:[
        {
            type:String,
            ref:"Ratingandreview"
        }
    ],
    studentsenrolled:[
        {
            type:String,
            ref:"User"
        }
    ],
    thumbnail:{
        type:String
    }
},{
    timestamps:true
})

export default mongoose.model("Course",courseschema);