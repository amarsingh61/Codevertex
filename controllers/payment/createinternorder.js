import instance from "../../config/razorpay.js";


const captureinternorder=async(req,res)=>{
    try {
        const options={
            amount:400*100,
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
export default captureinternorder;