const {validationResult} =require('express-validator');
const Events=require('./../Models/eventModel'); 

module.exports.getallEvents=(request,response,next)=>
{
    Events.find({})
    .then((data)=>{
    response.status(200).json({data});

    }).catch(error=>
        {
            next(error);
        })
    }
module.exports.getEventByID=(request,response,next)=>
{
    Events.findOne({_id:request.body.id})
    .then((data)=>
    {

        response.status(200).json({data});
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.addEvent=(request,response,next)=>
{
    let result= validationResult(request);
    if(!result.isEmpty())
    {
        let mes= result.array().reduce((current,error)=>current +error.msg+" "," ");
        let error=new Error(mes);
        error.status=422;
        throw error;

    }
    let event= new Events({
        _id:request.body.id,
        Email:request.body.Email,
        Password:request.body.Password
    });
    event.save()
    .then((data)=>
    {

        response.status(201).json({msg:"event added",data});
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.updateEvent=(request,response,next)=>
{
    // if (request.role!=="admin")
    // {
    //     throw new Error("Not Authorized");
    // }
    Events.updateOne({_id:request.body.id},{
        $set:{
            Email:request.body.Email,
            Password:request.body.Password
        }
    })
    .then((data)=>{
        if(data.matchedCount==0)
        throw new Error("Event not found");


         response.status(200).json({message:"up",data});
        
    })
    .catch(error=>
        {
            next(error);
        })
    }
module.exports.deleteEvent=(request,response,next)=>
{
        Events.deleteOne({_id:request.body.id})
        .then((data)=>{

            response.status(200).json({message:"Delete"});
        }).catch(error=>
            {
                next(error);
            })
        
    }