const express = require("express");
const router = express.Router();

const {addCourse, getCourse, getCourses, updateCourse, deletecourse} =require("../controllers/course");

router.post("/add",addCourse);
router.get("/courses",getCourse);
router.get("/course",getCourses);
router.put("/course",updateCourse);
router.delete("/", deletecourse);

module.exports = router