const {validationResult} =require('express-validator');
const Studnet=require('./../Models/studentModel'); 
const bcrypt=require('bcrypt');

module.exports.getallStudents=(request,response,next)=>
{
    Studnet.find({})
    .then((data)=>{
    response.status(200).json({data});

    }).catch(error=>
        {
            next(error);
        })
    }
module.exports.getStudentByID=(request,response,next)=>
{
    Studnet.findOne({_id:request.body.id})
    .then((data)=>
    {

        response.status(200).json({data});
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.addStudent=async(request,response,next)=>
{
    let hashed_pass;
    let result= validationResult(request);
    if(!result.isEmpty())
    {
        let mes= result.array().reduce((current,error)=>current +error.msg+" "," ");
        let error=new Error(mes);
        error.status=422;
        throw error;

    }
    //hash pass
   hashed_pass= await bcrypt.hash(request.body.Password,10);

    let student= new Studnet({
        _id:request.body.id,
        Email:request.body.Email,
        Password:hashed_pass
    });
    student.save()
    .then((data)=>
    {

        response.status(201).json({msg:"student added",data});
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.updateStudent=(request,response,next)=>
{
    // if (request.role!=="admin")
    // {
    //     throw new Error("Not Authorized");
    // }
    Studnet.updateOne({_id:request.body.id},{
        $set:{
            Email:request.body.Email,
            Password:request.body.Password
        }
    })
    .then((data)=>{
        if(data.matchedCount==0)
        throw new Error("Student not found");


         response.status(200).json({message:"up",data});
        
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.deleteStudent=(request,response,next)=>
{
        Studnet.deleteOne({_id:request.body.id})
        .then((data)=>{

            response.status(200).json({message:"Delete"});
        }).catch(error=>
            {
                next(error);
            })
        
    }