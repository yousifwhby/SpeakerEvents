const jwt =require('jsonwebtoken');
const Studnet=require('./../Models/studentModel'); 
const Speaker=require('./../Models/speakerModel'); 
module.exports.login= (request,response,next)=>
{
    let token;
    if(request.body.Email=="admin@hub.com"&&request.body.Password=="123")
    {
      token = jwt.sign(
        {
          _id:1,
          Email:request.body.Email,
          role:"admin"},
          "hellototheworld",
          {expireIn:"2hr"
        });
        response.status(200).json({message:"login",token});
    }
    else
    { //student credantials
      Student.findOne({Email:request.body.Email,Password:request.body.Password})
      .then(data=>
        {
        if (data==null)
          throw new Error("Email or password are wrong");
        token = jwt.sign(
          {
            _id:data._id,
            Email:data.Email,
            role:"student"},
            "hellototheworld",
            {expireIn:"2hr"
          });
          response.status(200).json({message:"login",token}); 
      })
      .catch(error=>next(error))


      //speaker credantials
      Speaker.findOne({Email:request.body.Email,Password:request.body.Password})
      .then(data=>
        {
        if (data==null)
          throw new Error("Email or password are wrong");
        token = jwt.sign(
          {
            _id:data._id,
            Email:data.Email,
            role:"speaker"},
            "hellototheworld",
            {expireIn:"2hr"
          });
          response.status(200).json({message:"login",token}); 
      })
      .catch(error=>next(error))


        

    }
};

