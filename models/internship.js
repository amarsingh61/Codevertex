import mongoose from "mongoose";

const internshipschema= new mongoose.Schema({
    email:{
        type:String
    },
    fullname:{
        type:String
    },
    gender:{
        ename:["Male","Female"]
    },
    domain:{
        ename:["Web Development","Android App Development","C++ / Python / Java Programming","UI/UX DESIGNING","AI / ML AND DATA SCIENCE","CYBER SECURITY"],
        required:true
    },
    college:{
        type:String
    },
    contactno:{
        type:Number
    },
    academicqualification:{
        type:String
    },
    currentyear:{
        type:String
    },
    resume:{
        type:string
    }
},
{
    timestamps:true
});

export default mongoose.Model("Internship",internshipschema);
