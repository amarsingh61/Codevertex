import User from "../../models/User.js"


const alluser=async(req,res)=>{
    try {
        const userId=req.userId;
        if(!userId)
        {
            return res.status.json({
                success:false,
                message:"please Login"
            })
        }

        const allusers=await User.find({}).select(" -password");

        res.status(200).json({
            success:true,
            message:"all user data fetched",
            data:allusers
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default alluser;