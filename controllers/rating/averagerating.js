import RatingAndReview from "../../models/Ratingandreview.js";

const averagerating=async(req,res)=>{
    try {
        
        const {courseId} = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: courseId,
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"},
                }
            }
        ])

        if(result.length > 0) {

            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            })

        }
        
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0, no ratings given till now',
            averageRating:0,
        })
    }
    catch(error) {

        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export default averagerating;