import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
import User from "../../models/User.js";

configDotenv();

const login =async(req,res)=>{
    try {
        const {email,password}=req.body;

        if(!email || !password)
        {
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            })
        }
        const mailid=email.toLowerCase();
        const existinguser=await User.findOne({email:mailid});

        if(!existinguser)
        {
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }


        if(await bcrypt.compare(password,existinguser.password))
        {
            const payload={
                id:existinguser._id,
                accountType:existinguser.accountType
            };

            const token= jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"15d"});

            const options = {
                httpOnly: true,
                maxAge: 15 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
                secure: process.env.NODE_ENV !== 'development'
            };

            res.cookie("token",token,options).status(200).json({
                success:true,
                message:"Logged in successfully"
            });

        }
        else
        {
            return res.status(500).json({
                success:false,
                message:"please check password again"
            })
        }

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default login;