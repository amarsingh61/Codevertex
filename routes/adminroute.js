import express from "express";
import createcategory from "../controllers/category/createcategory.js";
import createcourse from "../controllers/course/createcourse.js";
import deletecourse from "../controllers/course/deletecourse.js";
import updatecourse from "../controllers/course/updatecourse.js";
import createsection from "../controllers/section/createsection.js";
import updatesection from "../controllers/section/updatesection.js";
import deletesection from "../controllers/section/deletesection.js";
import addassignment from "../controllers/section/addassignment.js";
import createsubsection from "../controllers/subsection/createsubsection.js";
import updatesubsection from "../controllers/subsection/updatesubsection.js";
import deletesubsection from "../controllers/subsection/deletesubsection.js";
import alluser from "../controllers/user/allusers.js";
import updateaccountType from "../controllers/user/updaterole.js";
import auth from "../middlewares/auth.js";
import isAdmin from "../middlewares/isAdmin.js";


const adminrouter=express.Router();

//createcategory
adminrouter.post("/createcategory",auth,isAdmin,createcategory);

//createcourse
adminrouter.post("/createcourse",auth,isAdmin,createcourse);
//delete course
adminrouter.post("/deletecourse",auth,isAdmin,deletecourse);
//update course
adminrouter.put("/updatecourse",auth,isAdmin,updatecourse);

//create section
adminrouter.post("createsection",auth,isAdmin,createsection);
//update section
adminrouter.put("/updatesection",auth,isAdmin,updatesection);
//delete section
adminrouter.post("/deletesection",auth,isAdmin,deletesection);
//add assignment
adminrouter.post("/addassignment",auth,isAdmin,addassignment);

//create subsection
adminrouter.post("/createsubsection",auth,isAdmin,createsubsection);
//update subsection
adminrouter.put("/updatesubsection",auth,isAdmin,updatesubsection);
//delete subsection
adminrouter.post("/deletesubsection",auth,isAdmin,deletesubsection);

//all users
adminrouter.get("/allusers",auth,isAdmin,alluser);
//updaterole
adminrouter.put("/updaterole",auth,isAdmin,updateaccountType);


export default adminrouter;


