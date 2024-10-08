import Subsection from "../../models/Subsection.js";
import Courseprogress from "../../models/Courseprogress.js";

const updateCourseProgress = async (req, res) => {
    try {
        const { courseId, subsectionId } = req.body;
        const userId = req.userId;
        // Check if the subsection is valid
        const subsection = await Subsection.findById(subsectionId);
        if (!subsection) {
            return res.status(404).json({
                success:true,
                message: "Invalid subsection" 
            });
        }

        // Find the course progress document for the user and course
        let courseProgress = await Courseprogress.findOne({
            courseID: courseId,
            userId: userId,
        })

        if (!courseProgress) 
        {
            // If course progress doesn't exist, create a new one
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        }
        else 
        {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
                return res.status(400).json({ 
                    success:false,
                    message: "Subsection already completed"
                });
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId);
        }

        // Save the updated course progress
        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message: "Course progress updated" 
        })

    }catch (error) {
        return res.status(500).json({
            success:false,
            error: error.message 
        });
    }
}

export default updateCourseProgress