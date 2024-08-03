import instance from "../../config/razorpay.js";


const captureorder=async(req,res)=>{
    try {
        const {amount,courseId}=req.body;
        const userId=req.userId;

        const validcourse=await courseId.findById({_id:courseId});
        if(!validcourse)
        {
            return res.status(404).json({
                success:false,
                message:"the course doesnot exists"
            });
        }

        if(validcourse.studentsenrolled.includes(userId))
        {
            return res.status(200).json({
                success:false,
                message:"user already enrolled"
            })
        }

        const options={
            amount:amount*100,
            currency:"INR",
            receipt:Math.random(Date.now()).toString()
        };
        const order=await instance.orders.create(options);

        res.status(200).json({
            success:true,
            message:"Order created",
            data:order
        });

    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        );
    }
}
export default captureorder;