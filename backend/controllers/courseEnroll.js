const UserSchema = require("../models/userManagement_model");
const CourseSchema = require("../models/course_model");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

//student can enroll to the course, if they have already get enrolled to that specific sourse; this course will get un-enrolled
const enrollCourse = async(req, res) => {
    try {
        const { courseId } = req.params;
        const token = req.header("Authorization");

        if(courseId?.length === 24){

            jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
                if (err) {

                    res.status(500).json({
                        status: "Fail",
                        message:
                            "error occured - student profile not found",
                        courseInfo: null,
                        error: "error occured during fetching the student profile",
                    });
                } else {

                    const user = await UserSchema.findById(data.id);
                    if (user) {

                        const course = await CourseSchema.findById(courseId);
                        if(course){

                            if(user.enrolledCourses.includes(new mongoose.Types.ObjectId(course._id))){

                                user.enrolledCourses = user.enrolledCourses.filter((cid) => {
                                    if(cid.toString() !== course._id.toString()){
                                        return cid;
                                    }
                                });
                                await user.save();
                                res.status(200).json({
                                    status: "Success",
                                    message:
                                        "Already enrolled course; Successfully un-enrolled from the course",
                                    courseInfo: course,
                                    error: null,
                                });
                            }else{

                                user.enrolledCourses.push(course._id);
                                await user.save();
                                res.status(200).json({
                                    status: "Success",
                                    message:
                                        "Successfully enrolled in the course",
                                    courseInfo: course,
                                    error: null,
                                });
                            }
                        }else{

                            res.status(400).json({
                                status: "Fail",
                                message:
                                    "error occured - course not found",
                                courseInfo: null,
                                error: null,
                            });
                        }
                    } else {

                        res.status(404).json({
                            status: "Fail",
                            message:
                                "error occured - student profile not found",
                            courseInfo: null,
                            error: null,
                        });
                    }
                }
            });
        }else{
            res.status(400).json({
                status: "Fail",
                message:
                    "error occured - course not found",
                courseInfo: null,
                error: "course not found: invalid object id",
            });
        }
    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            status: "Fail",
            message:
                "error occured - Internal server error, unable to enroll course to students",
            courseInfo: null,
            error: `${error} : ${error.message}`,
        });
    }
}



const viewEnrolledStudents = async(req, res) => {
    try {
        const { courseId } = req.params;
        if(courseId.length === 24){
            const students  = await UserSchema.find({ enrolledCourses: new mongoose.Types.ObjectId(courseId)})
            // console.log(students);
            res.status(200).json({
                status: "Success",
                enrolledStudents: students,
                error: null
            })
        }else{
            res.status(400).json({
                status: "Fail",
                message: "error occured - enrolled students not found",
                enrolledStudents: null,
                error: "enrolled students not found: invalid object id",
            });
        }
    } catch (error) {
        console.log(error, error.message);
        res.status(500).json({
            status: "Fail",
            message: "error occured - Internal server error, unable to fetch enrolled students",
            enrolledStudents: null,
            error: `${error} : ${error.message}`,
        });
    }
}

module.exports={
    enrollCourse,
    viewEnrolledStudents
}
