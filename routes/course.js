const express = require("express");
const router = express.Router();

const {addCourse, getCourse, getCourses, updateCourse, deletecourse} =require("../controllers/course");

router.post("/add",addCourse);
router.get("/courses",getCourses);
router.get("/course",getCourse);
router.put("/course",updateCourse);
router.delete("/", deletecourse);

module.exports = router