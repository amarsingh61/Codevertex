import mongoose from "mongoose";

const subsectionschema=new mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    timeduration:{
        type:String
    },
    videourl:{
        type:String
    }
},{
    timestamps:true
});

export default mongoose.model("Subsection",subsectionschema);