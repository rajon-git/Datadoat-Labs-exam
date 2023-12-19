const { readdirSync } = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const helmet = require("helmet");
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(fileUpload());
app.use(cors());

// Routes
readdirSync("./routes").map((route) =>
  app.use("/api/v1", require(`./routes/${route}`))
);

// 404 Route
app.use('*', (req, res) => {
  res.status(404).json({ status: 'failed', data: 'Not Found' });
});

const port = process.env.PORT || 8000;

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start Server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  });
