import mongoose from "mongoose";
import mailSender from "../utils/mailsender.js";

const internshipschema= new mongoose.Schema({
    email:{
        type:String
    },
    fullname:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    domain:{
        type:String,
        enum:["Web Development","Android App Development","C++ / Python / Java Programming","UI/UX DESIGNING","AI / ML AND DATA SCIENCE","CYBER SECURITY"],
        required:true
    },
    college:{
        type:String
    },
    contactno:{
        type:Number
    },
    academicqualification:{
        type:String
    },
    currentyear:{
        type:String
    },
    resume:{
        type:String
    },
    userId:{
        type:String
    }
},
{
    timestamps:true,
    expires:90*24*60*60
});

export default mongoose.model("Internship",internshipschema);


internshipschema.post("save",async function (doc,next) {
    try {
		const mailResponse = await mailSender(
			doc.email,
			"Internship Registration Successfull",
			`<!DOCTYPE html>
                <html>
    
                <head>
                    <meta charset="UTF-8">
                    <title>Course Registration Confirmation</title>
                    <style>
                        body {
                            background-color: #ffffff;
                            font-family: Arial, sans-serif;
                            font-size: 16px;
                            line-height: 1.4;
                            color: #333333;
                            margin: 0;
                            padding: 0;
                        }
                
                
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            text-align: center;
                        }
                
                        .logo {
                            max-width: 200px;
                            margin-bottom: 20px;
                        }
                
                        .message {
                            font-size: 18px;
                            font-weight: bold;
                            margin-bottom: 20px;
                        }
                
                        .body {
                            font-size: 16px;
                            margin-bottom: 20px;
                        }

                        .highlight {
                            font-weight: bold;
                        }
                    </style>
                
                </head>
                
                <body>
                    <div class="container">
                        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo">
                        <div class="message">Internship Registration Confirmation</div>
                        <div class="body">
                            <p>Dear ${doc.fullname},</p>
                            <p>You have successfully registered for the internship <span class="highlight">"${doc.domain}"</span>. We
                                are excited to have you as a participant!</p>
                        </div>
                    </div>
                </body>
                
            </html>`
		);
		console.log("Email sent successfully: ", mailResponse.response);
        next();
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		next(error);
	}
});