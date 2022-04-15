const {validationResult} =require('express-validator');
const Speaker=require('./../Models/speakerModel'); 
const bcrypt=require('bcrypt');

module.exports.getallSpeaker=(request,response,next)=>
{
    Studnet.find({})
    .then((data)=>{
    response.status(200).json({data});

    }).catch(error=>
        {
            next(error);
        })
    }
module.exports.getSpeakertByID=(request,response,next)=>
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
module.exports.addSpeakers=async(request,response,next)=>
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

    let speaker= new Speaker({
        _id:request.body.id,
        Email:request.body.Email,
        Password:hashed_pass
    });
    speaker.save()
    .then((data)=>
    {

        response.status(201).json({msg:"Speaker added",data});
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.updateSpeakers=(request,response,next)=>
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
        throw new Error("Speaker not found");


         response.status(200).json({message:"up",data});
        
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.deleteSpeakers=(request,response,next)=>
{
        Studnet.deleteOne({_id:request.body.id})
        .then((data)=>{

            response.status(200).json({message:"Delete"});
        }).catch(error=>
            {
                next(error);
            })
        
    }