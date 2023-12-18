const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
var multer = require('multer')
var cors = require('cors');

const app = express();

app.use(fileUpload());
//Body Parser
// app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit:1000000}));
// app.use(bodyParser.json({limit: '50mb', extended: true}));
//routes implement
readdirSync("./routes").map(r=>app.use("/api/v1",require(`./routes/${r}`)));


app.get("/", (req, res) => res.send("Hello World"));

const port = process.env.PORT || 8000;

mongoose.connect(process.env.DATABASE)
        .then(()=>{
            app.listen(port,()=>{
                console.log(`Server is running on port ${port}`);
            });
        })
        .catch((error)=> console.log(error));