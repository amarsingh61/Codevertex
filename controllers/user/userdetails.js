import User from "../../models/User.js";

const userdetails=async(req,res)=>{
    try {
        const userId=req.userId;

        if(!userId)
        {
            return res.status(404).json({
                success:false,
                message:"please login"
            });
        }
        const userinfo=await User.findOne({_id:userId}).populate("courses");
        userinfo.password=undefined;

        res.status(200).json({
            success:true,
            message:"user details fetched",
            data:userinfo
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default userdetails;