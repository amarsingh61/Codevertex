import Course from "../../models/Course.js";

const showallcourses=async(req,res)=>{
    try {
        const allcourses=await Course.find({}).populate("Category")
                                                .populate("Ratingandreview")
                                                .exec();

        res.status(200).json({
            success:true,
            message:"All courses fetched successfully",
            data:allcourses
        })
    } catch (error) {
        res.status(500).json({
            succeess:false,
            message:error.messsage
        });
    }
}

export default showallcourses;