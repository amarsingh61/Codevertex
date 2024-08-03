import Course from "../../models/Course.js";
import Courseprogress from "../../models/Courseprogress.js";

const fetchcourseprogress=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const userId=req.userId;

        const progress=await Courseprogress.findOne({courseId:courseId,userId:userId});
        if(!progress)
        {
            return res.status(404).json({
                success:false,
                message:"user not enrolled for course"
            })
        }

        let completedvid=progress.completedVideos.length;

        const course = await Course.findById(courseId).populate({
            path: 'Section',
            populate: { path: 'Subsection' }
        });

        if (!course || !course.Section) {
            return res.status(404).json({
                success: false,
                message: "Course or sections not found"
            });
        }

        let totallen = 0;
        course.Section.forEach(section => {
            if (section.Subsection) {
                totallen += section.Subsection.length;
            }
        });

        const percent = (totallen === 0) ? 0 : (completedvid / totallen) * 100;

        res.status(200).json({
            success:true,
            message:"course progress ",
            data:percent
        })

    }catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default fetchcourseprogress