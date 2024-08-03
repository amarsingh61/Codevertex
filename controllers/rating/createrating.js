import Course from "../../models/Course.js";
import RatingAndReview from "../../models/Ratingandreview.js";


const createrating=async(req,res)=>{
    try{
        const userId = req.userId;
        
        const {rating, review, courseId} = req.body;
        
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsenrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        
        const alreadyReviewed = await RatingAndReview.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingandreviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});


        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            data:ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

export default createrating;