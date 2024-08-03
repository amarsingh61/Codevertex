import Subsection from "../../models/Subsection.js";
import Section from "../../models/Section.js";
import uploadtocloudinary from "../../utils/uploadtocloudinary.js";


const createsubsection=async(req,res)=>{
    try {
        const {sectionId,title ,description}=req.body;
        const video=req.files.video;

        if(!sectionId || !title || !description || !video)
        {
            return res.status(404).json({
                success:false,
                message:"All fields are required"
            });
        }

        const uploaddetails= await uploadtocloudinary(video,process.env.FOLDER_NAME);

        const newsubsection=await Subsection.create({
            title:title,
            description:description,
            timeduration:`${uploaddetails.duration}`,
            videourl:video.secure_url
        });

        const updatesection=await Section.findByIdAndUpdate({_id:sectionId},
                                                            {$push:{Subsection:newsubsection._id}},
                                                        {new:true});
        
        res.status(200).json({
            success:true,
            message:"Subsection created successfully",
            data:updatesection
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default createsubsection;