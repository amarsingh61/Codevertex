import mongoose from "mongoose";

const Sectionschema= new mongoose.Schema({
    sectionName:{
        type:String
    },
    Subsection:[
        {
            type:String,
            ref:"Subsection"
        }
    ],
    assignment:{
        type:String
    }
},{
    timestamps:true
});

export default mongoose.model("Section",Sectionschema);