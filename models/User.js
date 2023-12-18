const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String,
        lowercase: true,
    },
    last_name: {
        type: String,
        lowercase: true,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
}, {timestamps:true,versionKey:false});

const User=mongoose.model("users",UserSchema);
module.exports=User;
