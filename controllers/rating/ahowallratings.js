import RatingandReview from "../../models/Ratingandreview.js";

const showallratings=async(req,res)=>{
    try {
        const allReviews = await RatingandReview.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"username email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();

            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    } catch (error) {
        res.status(500).json(
            {
                success:false,
                message:error.message
            }
        )
    }
}

export default showallratings;