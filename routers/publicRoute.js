const express = require("express");
let PublicRouter = express.Router();
const multer = require("multer");

const upload = multer({
    fileFilter:(req, file, callback)=>{
        if(
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ){
            callback(null, true)
        }
    }
});

PublicRouter.get("/",(req, res)=>{
    res.render("pages/index");
});

PublicRouter.get("/aboutUs", (req, res)=>{
    res.render("pages/aboutUs");
})
PublicRouter.get("/programs",(req, res)=>{
    res.render("pages/program");
})
PublicRouter.get("/contact",(req,res)=>{
    res.render("pages/contact");
})
PublicRouter.get("/representativeForm",(req, res)=>{
    res.render("pages/representativeForm")
});

PublicRouter.get("/exhibition",(req,res)=>{
    res.render("pages/exhibition");
})

PublicRouter.get("/test",(req, res)=>{
    res.render("pages/tests")
});


const ApplicantSchema = require("../models/applicantRepresentativeSchema");

PublicRouter.post("/representativeApplicant", upload.single("image"),(req, res)=>{
    var applicantName = req.body.name;
    var email = req.body.email;
    var applicantPhone = req.body.phone;
    var birthdate = req.body.birthdate;
    var permanentAddress = req.body.permanentAddress;
    var presentAddress = req.body.presentAddress;
    var nid = req.body.nid;
    var birthCertificate = req.body.birthCertificate;
    var institute = req.body.institute;
    var post = req.body.post;
    var image = req.file;

    const representative = new ApplicantSchema({name:applicantName, email, phone:applicantPhone, birthdate, permanentAddress, presentAddress, nid, birthCertificate, institute, post, image})
    ApplicantSchema.findOne({email:email}).then((existed)=>{
        if(existed){
            res.status(422).render("pages/errorPage",{errorTitle:"Email invalid", errorSent:"দুঃখিত!!${email} - এই ইমেইলটি একজন ব্যবহার করছেন। দয়া করে আপনার ব্যক্তিগত ই-মেইল ব্যবহার করুন!"})
        }
        else{
            representative.save().then(()=>{
                res.render("pages/thankyou.ejs")
            }).catch((error)=>{
                console.log(error)
            })
        }
    })
})


module.exports =PublicRouter;