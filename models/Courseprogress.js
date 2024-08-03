import mongoose from "mongoose"

const courseProgressschema = new mongoose.Schema({
    courseID: {
      type: String,
      ref: "Course",
    },
    userId: {
      type: String,
      ref: "User",
    },
    completedVideos: [
      {
        type: String,
        ref: "Subsection",
      },
    ],
})

export default mongoose.model("Courseprogress",courseProgressschema);