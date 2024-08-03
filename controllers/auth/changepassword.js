import User from "../../models/User.js";
import bcrypt from "bcrypt";

const changepassword=async(req,res)=>{
    try {
        const userDetails = await User.findById(req.userId)

        const { oldPassword, newPassword } = req.body


        const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password);

        if (!isPasswordMatch) 
        {
            return res
            .status(401)
            .json({ success: false, message: "The password is incorrect" })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.userId,
            { password: encryptedPassword },
            { new: true }
        )

        res.status(200).json({
            success:true,
            message:"Password changed successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default changepassword;