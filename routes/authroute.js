import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/Login.js";
import logoutUser from "../controllers/auth/logout.js";
import changepassword from "../controllers/auth/changepassword.js";
import auth from "../middlewares/auth.js";
import resetpasswordtoken from "../controllers/auth/resetpasswordtoken.js";
import resetpassword from "../controllers/auth/resetpassword.js";

const authrouter=express.Router();

//signup
authrouter.post("/signup",signup);
//login
authrouter.post("/login",login);
//logout
authrouter.get("logout",logoutUser);
//change password
authrouter.post("/change-password",auth,changepassword);

authrouter.post("/requestpasswordreset",resetpasswordtoken);
//pass token as query in resetpassword
authrouter.post("/resetpassword",resetpassword);

export default authrouter;
