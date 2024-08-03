import Internship from "../../models/internship.js";
import User from "../../models/User.js";
import mongoose from "mongoose";

const addintern = async (email,
    fullname,
    gender,
    domain,
    college,
    contactno,
    academicqualification,
    currentyear,
    resume,userId,res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {

        if (!email || !fullname || !gender || !domain || !college || !contactno || !academicqualification || !currentyear || !resume || !userId) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
        }

        const newintern = await Internship.create([{
        email,
        fullname,
        gender,
        domain,
        college,
        contactno,
        academicqualification,
        currentyear,
        resume,
        userId
        }], { session });

        const updateduser = await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { internship: newintern._id } },
        { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({
            success: true,
            message: "Applied successfully",
        });

    }catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default addintern;
