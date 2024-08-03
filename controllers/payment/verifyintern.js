import crypto from "crypto";
import addintern from "./addintern";


const verifyinternpayment=async(req,res)=>{
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body;
        const {
            email,
            fullname,
            gender,
            domain,
            college,
            contactno,
            academicqualification,
            currentyear,
            resume,
            } = req.body;
        const userId=req.userId;

        const digest = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedsignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(digest.toString())
                                        .digest("hex");

        if (expectedsignature === razorpay_signature) {
            await addintern(email,
                fullname,
                gender,
                domain,
                college,
                contactno,
                academicqualification,
                currentyear,
                resume, userId, res);
            
            return res.status(200).json({ success: true, message: "Payment Verified" })
        }

    } catch (error) {
        res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

export default verifyinternpayment;