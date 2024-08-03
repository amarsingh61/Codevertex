import Course from "../../models/Course.js";

const updatecourse=async(req,res)=>{
    try {
        const {id,...coursedetails}=req.body;
        

        const updatedcourse=await Course.findByIdAndUpdate({_id:id},{...coursedetails},{new:true});

        if(!updatedcourse)
        {
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }
        
        res.status(200).json({
            success:true,
            message:"Course updated successfully",
            data:updatedcourse
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default updatecourse;