import User from "../../models/User.js";

const updateaccountType=async(req,res)=>{
    try {
        const {accountype,id}=req.body;

        const updateduser=await User.findByIdAndUpdate(id,{accountType:accountype},{new:true});
        console.log(updateduser);

        res.status(200).json({
            success:true,
            message:"Role updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default updateaccountType;