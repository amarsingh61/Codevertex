import mongoose from "mongoose";

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student"],
        required: true,
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    profilepic:{
        type:String
    },
    courses:[
        {
            type:String,
            ref:"Course"
        }
    ],
    courseprogress:[{
        type:String,
        ref:"Courseprogress"
    }],
    internship:[{
        type:String,
        ref:"Internship"
    }],
    resetpasswordexpires:{
        type:Date
    },
    token:{
        type:String
    }
},{
    timestamps:true,
});

export default mongoose.model("User",userschema);
