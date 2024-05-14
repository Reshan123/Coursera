const express = require("express");
const router = express.Router();
const {enrollCourse,viewEnrolledStudents} = require("../controllers/courseEnroll");
const {verifyAuthorityStudent} = require("../middlewares/user_middleware")

router.post("/:courseId",enrollCourse);
router.get("/view/:courseId",viewEnrolledStudents);

module.exports = router;