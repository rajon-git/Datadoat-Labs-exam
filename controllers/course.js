const coursemodel = require("../models/Course");
const usermodel = require("../models/User");
const catmodel = require("../models/Category");

const addCourse =async (req, res)=>{
    //req.body
  if (!req.body) {
    return res.status(400).json("request body is missing");
  }
  console.log(req.body);
  // let model=new coursemodel(req.body)
  // function(err, model){
  //     if(!err, model){
  catmodel.find({ categoryName: req.body.category }, function(error, cat) {
    if (!error && cat) {
      console.log("Cat printed" + cat);
      req.body.category = cat[0]._id;
    }
    console.log("Instructor Id" + req.body.instructor);
    const model = new coursemodel(req.body);
    model
      .save()
      .then(doc => {
        if (!doc || doc.length === 0) {
          return res.status(500).send(doc);
        }
        res.status(200).json(doc);
        console.log("Doc Printed" + doc);
        console.log("Model Printed" + model);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
}
module.exports= {addCourse}