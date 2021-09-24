const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config({path:"./.env"});

const DB = process.env.OfficialDB;
const AdminDB = process.env.AdminDB;

mongoose.connect(DB, {
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log("Connection established")
}).catch((error)=>{
    console.log(error)
})

// mongoose.connect(AdminDB,{
//     useNewUrlParser:true,
//     // useCreateIndex:true,
//     useUnifiedTopology:true,
//     // useFindAndModify:false
// }).then(()=>{
//     console.log("Connection established")
// }).catch((error)=>{
//     console.log(error)
// })
// nVfI8hGMhanDBOSQ