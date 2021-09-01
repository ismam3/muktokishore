const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");


const app = express();

app.use("/static",express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",(req, res)=>{
    res.sendFile(__dirname + "/index.html");
});

app.get("/joinUs",(req, res)=>{
    res.sendFile(__dirname + "/joinUs.html");
});


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
            callBack(null, request.body.name + "_" + "_" + request.body.phone_number+ "_" + institute + "_" + classU + "#" + file.originalname)
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
