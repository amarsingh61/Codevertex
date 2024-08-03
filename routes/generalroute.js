import express from "express";
import categorywisecourses from "../controllers/category/categorywisecourses.js";
import showallcategory from "../controllers/category/showallcategory.js";
import coursedetailsenrolled from "../controllers/course/coursedetailsenrolled.js";
import coursedetailsforunenrolled from "../controllers/course/coursedetailsforunenrolled.js";
import showallcourses from "../controllers/course/showallcourse.js";
import fetchcourseprogress from "../controllers/courseprogress/fetchcourseprogress.js";
import updateCourseProgress from "../controllers/courseprogress/updatecourseprogress.js";
import showallratings from "../controllers/rating/ahowallratings.js";
import averagerating from "../controllers/rating/averagerating.js";
import showcoursewiserating from "../controllers/rating/showcoursewiserating.js";
import createrating from "../controllers/rating/createrating.js";
import userdetails from "../controllers/user/userdetails.js";
import captureorder from "../controllers/payment/createorder.js";
import verifypayment from "../controllers/payment/verifypayment.js";
import auth from "../middlewares/auth.js";
import createinternship from "../controllers/internship/createinternship.js";

const apirouter=express.Router();


apirouter.post("/categorywisecourses",categorywisecourses);
apirouter.get("/all-categories",showallcategory);

apirouter.post("/enrolledcoursedetails",auth,coursedetailsenrolled);
apirouter.post("/coursedetails",coursedetailsforunenrolled);
apirouter.get("/all-courses",showallcourses);

apirouter.post("/courseprogress",auth,fetchcourseprogress);
apirouter.post("/update-courseprogress",auth,updateCourseProgress);

apirouter.get("all-ratings",showallratings);
apirouter.post("average-rating",averagerating);
apirouter.post("/coursewiserating",showcoursewiserating);
apirouter.post("/createrating",auth,createrating);


apirouter.get("/user-details",auth,userdetails);

apirouter.post("/create-order",auth,captureorder);
apirouter.post("/verify-payment",auth,verifypayment);

apirouter.post("/internship",auth,createinternship);

export default apirouter;