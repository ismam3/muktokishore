const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const session = require("express-session");


const app = express();

app.use("/static",express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    secret:"mukto",
    resave:true,
    saveUninitialized:true
}))

// connecting to database
require("./database/connection");

const adminRouter = require("./routers/admin_route")
app.use("/admin", adminRouter);

// importing schemas
const Teacher = require("./models/teacherSchema");
const ApplicantRepresentativeSchema = require("./models/applicantRepresentativeSchema");
const { Session } = require("express-session");


//creating image uploading middleware
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


app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/joinUs",(req, res)=>{
    res.sendFile(__dirname + "/joinUs.html");
});

app.get("/aboutUs", (req, res)=>{
    res.render("pages/aboutUs");
})
app.get("/programs",(req, res)=>{
    res.render("pages/program");
})
app.get("/contact",(req,res)=>{
    res.render("pages/contact");
})
app.get("/representativeForm",(req, res)=>{
    res.render("pages/representativeForm")
})

app.get("/test",(req, res)=>{
    res.render("pages/tests")
});
app.get("/admin/teacher",(req,res)=>{
    res.render("adminPages/addTeacherForm")
})

// handling post request
app.post("/admin/addTeacher", upload.single("image"),(req, res)=>{
    var email = req.body.email;
    var teacherName = req.body.name;
    var teacherPhone = req.body.phone;
    var birthdate = req.body.birthdate;
    var permanentAddress = req.body.permanentAddress;
    var presentAddress = req.body.presentAddress;
    var nid = req.body.nid;
    var institute = req.body.institute;
    var post = req.body.post;
    var image = req.file;

    const teacher = new Teacher({name:teacherName, email, phone:teacherPhone, birthdate, permanentAddress, presentAddress, nid, institute, post, image})
    Teacher.findOne({email:email}).then((existed)=>{
        if(existed){
            res.status(422)
        }
        else{
            teacher.save().then(()=>{
                res.send("Added")
            }).catch((error)=>{
                console.log(error)
            })
        }
    })
})

app.post("/representativeApplicant", upload.single("image"),(req, res)=>{
    var applicantName = req.body.name;
    var email = req.body.email;
    var applicantPhone = req.body.phone;
    var birthdate = req.body.birthdate;
    var permanentAddress = req.body.permanentAddress;
    var presentAddress = req.body.presentAddress;
    var nid = req.body.nid;
    var institute = req.body.institute;
    var post = req.body.post;
    var image = req.file;

    const teacher = new ApplicantRepresentativeSchema({name:applicantName, email, phone:applicantPhone, birthdate, permanentAddress, presentAddress, nid, institute, post, image})
    ApplicantRepresentativeSchema.findOne({email:email}).then((existed)=>{
        if(existed){
            res.status(422)
        }
        else{
            teacher.save().then(()=>{
                res.send("Added")
            }).catch((error)=>{
                console.log(error)
            })
        }
    })
})

app.post("/articles4magazine",(req,res)=>{
    let name = req.body.name;
    let phone = req.body.phone_number;
    let institute = req.body.school;
    let classU = req.body.class;
    let storage = multer.diskStorage({
        destination:(request, file, callBack)=>{
            callBack(null,__dirname + "/public/articles4magazine")
        },
        filename:(request, file, callBack)=>{
            callBack(null, name + "_" + "_" + phone+ "_" + institute + "_" + classU + "#" + file.originalname)
        }
    })
    
    let upload = multer({storage:storage}).single("article");

    upload(req, res, error=>{
        if(error){
            res.send(error)
            console.log(error)
        }
        else{
            res.sendFile(__dirname + "/thankyou.html");
        }
    })

});

app.listen(4000, ()=>{
    console.log("server is running")
});
