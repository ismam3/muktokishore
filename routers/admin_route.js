const express = require("express");
let router = express.Router();
let session = require("express-session");
const ApplicantRepresentativeSchema = require("../models/applicantRepresentativeSchema");

require("../database/connection");

let ApplicantSchema = require("../models/applicantRepresentativeSchema");

router.route("/").get((req, res)=>{
    if(req.session.adminAuthenticated===undefined||req.session.adminAuthenticated===null||req.session.adminAuthenticated===""||req.session.adminAuthenticated===false){
        res.render("adminPages/login",{issue:""});
    }
    else{
        res.render("adminPages/home")
    }
}).post((req, res)=>{
    if(process.env.adminId === req.body.id && process.env.adminPassword === req.body.password){
        req.session.adminAuthenticated = true
        res.render("adminPages/home")
    }
    else{
        res.render("adminPages/login", {issue:"Admin Id or password is error!!Try again"});
    }
})

router.route("/representative_applicants").get((req, res)=>{
    let applicants_array = []
    ApplicantSchema.find({},(err, applicants)=>{
        res.render("adminPages/representatives", {data:applicants})
    })
})
router.route("/name").get((req, res)=>{
    res.send(req.session.name);
})

module.exports = router;