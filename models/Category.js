import mongoose from "mongoose";

const categoryschema= new mongoose.Schema({
    categoryname:{
        type:String
    },
    description:{
        type:String
    },
    courses:[{
        type:String,
        ref:"Course"
    }]
},{
    timestamps:true
});

export default mongoose.model("Category",categoryschema);