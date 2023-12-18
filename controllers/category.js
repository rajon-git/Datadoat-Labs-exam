const catmodel=require('../models/Category');

const addCategory =async (req, res)=>{
    //req.body
    if(!req.body){
        return res.status(400).send("request body is missing")
    }

    let model=new catmodel(req.body)
    model.save()
    .then(doc=>{
        if(!doc ||doc.length===0){
            return res.status(500).send(doc)
        }
        res.status(200).send(doc)

    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

const getCategory =async (req, res)=>{
    //var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

    catmodel.findOne({
        _id: req.query.id
    })
        .then(doc => {
            
            res.json(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
}

const updateCategory =async (req, res)=>{
    catmodel.findOneAndUpdate({
        _id: req.query.id
    }, req.body,{
        new:true
    })
        .then(doc => {
            
            res.json(doc)
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
}
module.exports= {addCategory, getCategory, updateCategory, allCategories}