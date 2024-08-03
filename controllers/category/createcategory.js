import Category from "../../models/Category.js";


const createcategory=async(req,res)=>{
    try {
        const {categoryname,description}=req.body;
         
        if(categoryname)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        const newcategory=await Category.create({
            categoryname:categoryname,
            description:description
        });

        res.status(200).json({
            success:true,
            message:"Category created successfully",
            data:newcategory
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export default createcategory;