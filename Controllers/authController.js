const jwt =require('jsonwebtoken');

module.exports.login=(request,response,next)=>
{
    let token;
    if(request.body.Email=="admin"&&request.body.Password=="123")
    {
      token = jwt.sign({

        });
        response.status(200).json({message:"login"})
    }
    else
    {
        

    }
};

