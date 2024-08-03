
import mongoose from "mongoose";


const ratingAndReviewSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
		ref: "User",
	},
	rating: {
		type: Number,
		required: true,
	},
	review: {
		type: String,
		required: true,
	},
	course: {
		type: String,
		required: true,
		ref: "Course",
		index: true,
	},
},{
    timestamps:true
});

export default mongoose.model("Ratingandreview",ratingAndReviewSchema);

