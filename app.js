
const express= require('express');
const bodyparser= require('body-parser');
const path = require("path");
const mongoose =require('mongoose');
const studentRouter=require('./Routers/studentRouter');
const eventRouter=require('./Routers/eventRouter');
const authRouter=require('./Routers/authRouter');
const authanticationMW=require("./MiddleWare/authMiddleWare");

const server = express();

mongoose.connect("mongodb://localhost:27017/NodePro")
.then(()=>{
    console.log("DB is Connected");
    server.listen(process.env.PORT||6565,()=>{console.log("Listning......")});
})
.catch(error=>console.log("DB Connection Problem"))


//logger mw
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();

});




//midlleware
server.use(bodyparser.json());
server.use(bodyparser.urlencoded({extended:true}));


//router
server.use(authRouter);
server.use(authanticationMW);
server.use(studentRouter);
server.use(eventRouter);












//not found mw
server.use((request,response,next)=>{
    response.status(404).json({message:"Not Found"});

});
//error mw
server.use((error,request,response,next)=>{
    response.status(500).json({message:error+""});

});
