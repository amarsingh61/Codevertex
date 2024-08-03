import Category from "../../models/Category.js";
import Course from "../../models/Course.js";
import uploadtocloudinary from "../../utils/uploadtocloudinary.js";

const createcourse=async(req,res)=>{
    try {
        const {courseName,coursedescription,whatYouWillLearn,price,category}=req.body;

        if(!courseName || !coursedescription || !whatYouWillLearn || !price || !category)
        {
            return res.status(404).json({
                success:false,
                message:"All feilds required"
            })
        }

        const iscategory=await Category.findOne({categoryname:category});
        if(!iscategory)
        {
            return res.status(404).json({
                success:true,
                message:"Category is not available"
            })
        }

        const thumbnail=req.files.thumbnail;

        const thumbnailimage=await uploadtocloudinary(thumbnail,process.env.FOLDER_NAME);

        const newcourse=await Course.create({
            courseName,
            coursedescription,
            whatYouWillLearn,
            price,
            category:iscategory._id,
            thumbnail:thumbnailimage.secure_url
        });

        const updatecategory=await Category.findByIdAndUpdate({_id:iscategory._id},{"$push":{courses:newcourse._id}},{new:true});

        res.status(200).json({
            success:true,
            message:"Course created SuccessFully",
            data:newcourse
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

export default createcourse;