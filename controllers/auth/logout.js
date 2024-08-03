const logoutUser = async (req, res) => {
    try {

        res.cookie("token", "", { maxAge: 0 })
        
        res.status(200).json({
            success:true,
            message: "Logged out successfully"  
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message 
        })
    }
}

export default logoutUser;