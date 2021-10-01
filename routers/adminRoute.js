const express = require("express");
let router = express.Router();
let session = require("express-session");

require("../database/connection");

let ApplicantSchema = require("../models/applicantRepresentativeSchema");
const Representative = require("../models/representativeSchema");


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
});

router.route("/representative_applicants").get((req, res)=>{
    if(req.session.adminAuthenticated===undefined||req.session.adminAuthenticated===null||req.session.adminAuthenticated===""||req.session.adminAuthenticated===false){
        res.render("adminPages/login",{issue:"Please Login first"});
    }
    else{
        ApplicantSchema.find({},(err, applicants)=>{
            res.render("adminPages/representatives", {data:applicants})
        })
    }
});

router.get("/representative/:id",(req, res)=>{
    if(req.session.adminAuthenticated===undefined||req.session.adminAuthenticated===null||req.session.adminAuthenticated===""||req.session.adminAuthenticated===false){
        res.render("adminPages/login",{issue:"Please Login first"});
    }
    else{
        ApplicantSchema.find({_id:req.params.id},(err, representative)=>{
            res.render("adminPages/representativeDetails",{data:representative})
        })
    }
})

router.get("/addRepresentative/:id", (req, res)=>{
    if(req.session.adminAuthenticated===undefined||req.session.adminAuthenticated===null||req.session.adminAuthenticated===""||req.session.adminAuthenticated===false){
        res.render("adminPages/login",{issue:"Please Login first"});
    }
    else{
        ApplicantSchema.find({_id:req.params.id},(err, representative)=>{
            Representative.findOne({email:representative[0].email}).then((existed)=>{
                if(existed){
                    res.status(422).render("pages/errorPage",{errorTitle:"Email invalid", errorSent:"দুঃখিত!!${email} - এই ইমেইলটি একজন ব্যবহার করছেন। অন্য কোনো প্রতিনিধি এই ইমেইল ব্যবহার করতে পারবেন না।"})
                }
                else{
                    let newRepresentative = new Representative({name:representative[0].name, email:representative[0].email, phone:representative[0].phone, birthdate:representative[0].phone, permanentAddress:representative[0].permanentAddress, presentAddress:representative[0].presentAddress, nid:representative[0].nid, birthCertificate:representative[0].birthCertificate, institute:representative[0].institute, post:representative[0].post, image:representative[0].image})

                    newRepresentative.save().then(()=>{
                        ApplicantSchema.deleteOne({email:representative[0].email},(errr, suc)=>{
                            res.send("Representative added")
                        })
                    }).catch((err)=>{
                        res.send(err)
                    })
                }
            })
        })
    }
})

module.exports = router;