import bcrypt from "bcrypt";
import User from "../../models/User.js";
import uploadtocloudinary from "../../utils/uploadtocloudinary.js";

const signup=async(req,res)=>{
    try {
        const {email,username,password,confirmpassword,gender}=req.body;

        if(!email || !username ||!password || !confirmpassword || !gender)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        if(password!==confirmpassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and Confirm password does not match"
            })
        }

        const mailid=email.toLowerCase();
        let existinguser=await User.findOne({email:mailid});
        if(existinguser)
        {
            return res.status(400).json({
                success:false,
                message:"User already exist"
            })
        }
        existinguser=await User.findOne({username:username});
        if(existinguser)
        {
            return res.status(400).json({
                success:false,
                message:"try another username"
            })
        }

        const image=req.files?.profilepic;
        console.log(image);
        let profilepic=null;

        if(image)
        {
            profilepic=await uploadtocloudinary(image,process.env.USER_FOLER_NAME);
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newuser=await User.create({
            username:username,
            password:hashedPassword,
            email:mailid,
            gender:gender,
            accountType:"Student",
            profilepic:profilepic!==null?profilepic.secure_url:(gender==="Male"?boyProfilePicture:girlProfilePicture)
        });

        res.status(200).json({
            success:true,
            message:"Account created Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default signup;