import Course from "../../models/Course.js";
import convertSecondsToDuration from "../../utils/convertsectoduration.js";

const coursedetailsforunenrolled=async(req,res)=>{
    try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({_id: courseId,})
                                        .populate("category")
                                        .populate("ratingAndReviews")
                                        .populate({
                                            path: "courseContent",
                                            populate: {
                                                path: "Subsection",
                                                select: "-videoUrl",
                                            },
                                        })
                                        .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.Subsection.forEach((Subsection) => 
        {
            const timeDurationInSeconds = parseInt(Subsection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      message:"Course details fetched successfully",
      data: {
        courseDetails,
        totalDuration,
        }
    });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default coursedetailsforunenrolled;