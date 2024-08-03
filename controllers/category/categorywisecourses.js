import Category from "../../models/Category.js";


const categorywisecourses=async(req,res)=>{
    try {
        const {courseId}=req.body;

        const categorycourses=await Category.find({_id:courseId}).populate({
            path:"courses",
            populate:"ratingandreview"
        }).exec();

        if(!categorycourses)
        {
            return res.status(404).json({
                success:false,
                message:"Category doesnot exists"
            });
        }

        if(categorycourses.courses.length===0)
        {
            return res.status(404).json({
                success:false,
                message:"No Courses Found"
            })
        }

        const othercourses=await Category.findById({_id:{$ne:courseId}}).populate({
            path:"courses",
            populate:"ratingandreview"
        });

        res.status(200).json({
            success:true,
            message:"category wise courses fetched successfully",
            data:{categorycourses,othercourses}
        });
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       });
    }
}

export default categorywisecourses;