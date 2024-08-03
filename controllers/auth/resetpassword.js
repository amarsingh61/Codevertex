import bcrypt from "bcrypt";
import User from "../../models/User.js";

const resetpassword=async(req,res)=>{
    try {
        const {token}=req.query;
		const { password, confirmPassword} = req.body;

		if (confirmPassword !== password) {
			return res.json({
				success: false,
				message: "Password and Confirm Password Does not Match",
			});
		}

		const userDetails = await User.findOne({ token: token });

		if (!userDetails) {

			return res.json({
				success: false,
				message: "Token is Invalid",
			});
		}

		if (!(userDetails.resetpasswordexpires > Date.now())) {
            userDetails.token=undefined;
            userDetails.resetpasswordexpires=undefined;
            await userDetails.save();
            
			return res.status(403).json({
				success: false,
				message: `Token is Expired, Please Regenerate Your Token`,
			});
		}
		const encryptedPassword = await bcrypt.hash(password, 10);
		userDetails.password=encryptedPassword;
        userDetails.token=undefined;
        userDetails.resetpasswordexpires=undefined;

        await userDetails.save();
		res.json({
			success: true,
			message: `Password Reset Successful`,
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Updating the Password`,
		});
	}
}

export default resetpassword;