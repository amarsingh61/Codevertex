import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(console.log("database connected"))
    .catch((error)=>{
        console.log(error);
        process.exit(1);
    })
}

export default dbconnect;