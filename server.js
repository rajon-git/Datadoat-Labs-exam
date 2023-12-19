const { readdirSync } = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const multer = require('multer');
const morgan = require("morgan");
const helmet = require("helmet");
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(morgan("dev"))
app.use(fileUpload());
app.use(cors());

readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));

app.use('*', (req, res) => {
  res.status(404).json({status: 'failed', data: 'Hello World'});
});

const port = process.env.PORT || 8000;


mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

