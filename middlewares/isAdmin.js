
const isAdmin=(req,res,next)=>{
    try {
		if (req.accountType !== "Admin") {
			return res.status(401).json({
				success: false,
				message: "This is a Protected Route for Admin",
			});
		}

		next();
	} catch (error) {
		return res.status(500).json({ 
            success: false,
            message: `User Role Can't be Verified` 
        });
	}
}

export default isAdmin;