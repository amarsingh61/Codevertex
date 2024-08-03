import User from "../../models/User.js";
import Section from "../../models/Section.js";
import Subsection from "../../models/Subsection.js";
import Course from "../../models/Course.js";

const deletecourse=async(req,res)=>{
    try {
        const {courseId}=req.body;

        const course = await Course.findById(courseId)
        if (!course) {
          return res.status(404).json({
            success:false,
            message: "Course not found" 
            })
        }
    
        // Unenroll students from the course
        const studentsEnrolled = course.studentsenrolled
        for (const studentId of studentsEnrolled) {
          await User.findByIdAndUpdate({_id:studentId}, {
            $pull: { courses: courseId },
          })
        }
    
        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
          // Delete sub-sections of the section
          const section = await Section.findById(sectionId)
          if (section) {
            const subSections = section.Subsection
            for (const subSectionId of subSections) {
              await Subsection.findByIdAndDelete(subSectionId)
            }
          }
    
          // Delete the section
          await Section.findByIdAndDelete(sectionId)
        }
    
        // Delete the course
        await Course.findByIdAndDelete(courseId)
    
        return res.status(200).json({
          success: true,
          message: "Course deleted successfully",
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default deletecourse;