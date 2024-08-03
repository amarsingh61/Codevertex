import Subsection from "../../models/Subsection.js";
import uploadtocloudinary from "../../utils/uploadtocloudinary.js";

const updatesubsection=async(req,res)=>{
    try {
        const {subsectionId,...updatevalue}=req.body;

        const video=req.files.video;
        let uploadfiles;
        if(video)
        {
            uploadfiles=await uploadtocloudinary(video,process.env.FOLDER_NAME);            
        }

        const updatedsubsection=await Subsection.findByIdAndUpdate({_id:subsectionId},{...updatevalue},{new:true});

        if(!updatedsubsection)
        {
            return res.status(404).json({
                success:false,
                message:"subsection doesnot exist"
            });
        }

        updatedsubsection.timeduration=`${uploadfiles.duration}`;
        updatedsubsection.videourl=uploadfiles.secure_url;

        await updatedsubsection.save();

        res.status(200).json({
            success:true,
            message:"subsection updated successfully",
            data:updatedsubsection
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

export default updatesubsection