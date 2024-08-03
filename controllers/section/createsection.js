import Section from "../../models/Section.js";
import Course from "../../models/Course.js";


const createsection = async(req,res) => {
    try {
        const {sectionName,courseId}=req.body;

        if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(courseId,{
				                                                        $push: {
					                                                        courseContent: newSection._id,
				                                                            },
			                                                            },
			                                                            { new: true })
			                                                            .populate({
                                                                            path: "courseContent",
                                                                            populate: {
                                                                                path: "Subsection",
                                                                            },
                                                                        })
                                                                        .exec();

		res.status(200).json({
			success: true,
			message: "Section created successfully",
			data:updatedCourse,
		});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default createsection;