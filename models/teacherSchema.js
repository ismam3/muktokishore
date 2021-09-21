const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    birthdate:{
        type:Date,
        required:true
    },
    permanentAddress:{
        type:String,
        required:true
    },
    presentAddress:{
        type:String
    },
    nid:{
        type:String,
        required:true
    },
    institute:{
        type:String,
        required:true
    },
    post:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    }
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;