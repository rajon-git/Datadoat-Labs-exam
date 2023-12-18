const express=require('express')
const router= express.Router()

const {addRole,showRole}= require("../controllers/role");
router.post("/add", addRole);

router.get('/showroles',showRole); 

module.exports = router