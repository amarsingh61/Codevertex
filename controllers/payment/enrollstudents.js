import Course from "../../models/Course.js"
import Courseprogress from "../../models/Courseprogress.js";

const enrollStudents=async(courseId,userId,res)=>{
    try {
        if(!courseId || !userId)
        {
            return res.status(200).json({
                success:false,
                message:"please provide userId and CourseId"
            })
        }

        const enrollcourse=await Course.findByIdAndUpdate({_id:courseId},{$push:{studentsenrolled:userId}},{new:true});
        if(!enrollcourse)
        {
            return res.status(500).json({
                success:false,
                message:"Course not found"
            })
        }

        const courseProgress = await Courseprogress.create({
            courseID: courseId,
            userId: userId,
            completedVideos: [],
        });

        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            {
              $push: {
                courses: courseId,
                courseProgress: courseProgress._id,
              },
            },
            { new: true }
        );

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default enrollStudents;