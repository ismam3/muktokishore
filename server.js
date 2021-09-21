const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");


const app = express();

app.use("/static",express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connecting to database
require("./database/connection");

const adminRouter = require("./admin_route")
app.use("/admin", adminRouter);

// importing schemas
const Teacher = require("./models/teacherSchema");


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

app.get("/test",(req, res)=>{
    res.render("pages/tests")
});
app.get("/admin/teacher",(req,res)=>{
    res.render("adminPages/addTeacherForm")
})

// handling post request
app.post("/admin/addTeacher", upload.single("image"),(req, res)=>{
    let teacherName = req.body.name;
    let email = req.body.email;
    let teacherPhone = req.body.phone;
    let birthdate = req.body.birthdate;
    let permanentAddress = req.body.permanentAddress;
    let presentAddress = req.body.presentAddress;
    let nid = req.body.nid;
    let institute = req.body.institute;
    let post = req.body.post;
    let image = req.file;

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
