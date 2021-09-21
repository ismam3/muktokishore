const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config({path:"./config.env"});

const DB = process.env.OfficialDB;

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
// nVfI8hGMhanDBOSQ