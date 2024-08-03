import Category from "../../models/Category.js";


const showallcategory=async(req,res)=>{
    try {
        const allcategory=await Category.find({});

        res.status(200).json({
            success:true,
            message:"all categories fetched",
            data:allcategory
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

export default showallcategory;