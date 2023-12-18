const express = require("express");
const router = express.Router();

const {addCourse, getCourse, getCourses, updateCourse, deletecourse, coursebyinstructor} =require("../controllers/course");

router.post("/add",addCourse);
router.get("/courses",getCourses);
router.get("/course",getCourse);
router.put("/course",updateCourse);
router.delete("/", deletecourse);
router.get("/coursebyinstructor", coursebyinstructor);

module.exports = router