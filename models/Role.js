const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserRoleSchema = new Schema({
    no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }});

const User=mongoose.model("userRole",UserRoleSchema);
module.exports=User;
   