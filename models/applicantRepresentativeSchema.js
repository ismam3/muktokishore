const mongoose = require("mongoose");

const applicantRepresentativeSchema = new mongoose.Schema({
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
        type:Number,
    },
    birthCertificate:{
        type:Number
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

const ApplicantRepresentativeSchema = mongoose.model("representative_applicants", applicantRepresentativeSchema);
module.exports = ApplicantRepresentativeSchema;