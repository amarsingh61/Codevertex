import Section from "../../models/Section.js";


const addassignment=async(req,res)=>{
    try {
        const {assignment,sectionId}=req.body;

        const updatedsection=await Section.findByIdAndUpdate({_id:sectionId},{assignment:assignment},{new:true});
        if(updatedsection)
        {
            return res.status(404).json({
                success:false,
                message:"Section doesnot exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"Assignment added successfully",
            data:updatedsection
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default addassignment;