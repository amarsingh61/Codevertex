import Section from "../../models/Section.js";
import Course from "../../models/Course.js";

const updatesection = async(req,res) => {
    try {
        const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate({_id:sectionId},{ sectionName:sectionName },{ new: true });

		const course = await Course.findById(courseId)
                                    .populate({
                                        path:"courseContent",
                                        populate:{
                                            path:"Subsection",
                                        },
                                    })
                                    .exec();

		res.status(200).json({
			success: true,
			message: "section Updated SuccessFully",
			data:course,
		});
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default updatesection