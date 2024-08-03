import Section from "../../models/Section.js";
import Subsection from "../../models/Subsection.js";

const deletesubsection=async(req,res)=>{
    try {
        const {sectionId,subsectionId}=req.body;

        await Section.findByIdAndUpdate({_id:sectionId},{$pull:{Subsection:subsectionId}},{new:true});

        await Subsection.findByIdAndDelete({_id:subsectionId});

        res.status(200).json({
            success:true,
            message:"Subsection deleted successfully",
            data:[]
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default deletesubsection;