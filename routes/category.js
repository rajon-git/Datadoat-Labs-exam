const express=require('express')
const router= express.Router()

router.post("add",addCategory);
router.get("/", getCategory);
router.put("/", updateCategory);
router.get('/categories',allCategories);


module.exports = router