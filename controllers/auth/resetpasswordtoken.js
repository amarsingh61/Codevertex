import User from "../../models/User.js";
import crypto from "crypto";
import mailSender from "../../utils/mailsender.js";

const resetpasswordtoken=async(req,res)=>{
    try {
		const {email} = req.body;
		const user = await User.findOne({ email: email });
		if (!user) {
			return res.json({
				success: false,
				message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
			});
		}
		const token = crypto.randomBytes(20).toString("hex");

		const updatedDetails = await User.findOneAndUpdate(
			{ email: email },
			{
				token: token,
				resetpasswordexpires: Date.now() + 5*60*1000,
			},
			{ new: true }
		);

		const url = `http://localhost:3000/reset-password/${token}`;

		await mailSender(
			email,
			"Password Reset",
			`Your Link for email verification is ${url}. Please click this url to reset your password.`
		);

		res.json({
			success: true,
			message:"Email Sent Successfully, Please Check Your Email to Continue Further",
		});
	} catch (error) {
		return res.json({
			error: error.message,
			success: false,
			message: `Some Error in Sending the Reset Message`,
		});
	}
}

export default resetpasswordtoken;