import express from "express";
import dbconnect from "./config/database.js";
import adminrouter from "./routes/adminroute.js";
import authrouter from "./routes/authroute.js";
import apirouter from "./routes/generalroute.js";
import fileupload from "express-fileupload";
import cloudinaryConnect from "./config/cloudinary.js";

const app=express();
cloudinaryConnect();

const PORT=process.env.PORT;
app.use(express.json());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}));

dbconnect();

app.use("/admin",adminrouter);
app.use("/auth",authrouter);
app.use("/api",apirouter);

app.listen(PORT,()=>{
    console.log(`server running at Port : ${PORT}`)
});

