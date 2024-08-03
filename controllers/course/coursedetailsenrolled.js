
import Courseprogress from "../../models/Courseprogress.js";
import Course from "../../models/Course.js";


const coursedetailsenrolled=async(req,res)=>{
    try
    {
        const { courseId } = req.body;
        const userId = req.userId;
        const courseDetails = await Course.findOne({_id: courseId,})
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate({
                                                path: "courseContent",
                                                populate: {
                                                path: "Subsection",
                                                },
                                            })
                                            .exec();
    
        let courseProgressCount = await Courseprogress.findOne({
          courseID: courseId,
          userId: userId,
        })
    
        //console.log("courseProgressCount : ", courseProgressCount)
    
        if (!courseDetails) {
          return res.status(400).json({
            success: false,
            message: `Could not find course with id: ${courseId}`,
          })
        }
    
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.Subsection.forEach((Subsection) => {
            const timeDurationInSeconds = parseInt(Subsection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
          })
        })
    
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    
        return res.status(200).json({
          success: true,
          message:"course details fetched successfully",
          data: {
            courseDetails,
            totalDuration,
            completedVideos: courseProgressCount?.completedVideos
              ? courseProgressCount?.completedVideos
              : [],
          }
        })
    }catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        })
    }
}

export default coursedetailsenrolled;