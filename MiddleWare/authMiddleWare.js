
const jwt=require('jsonwebtoken');
module.exports=(request,response,next)=>{
    let token,decodedtoken;
    try{

        token=request.get("Authorization").split(" ")[1];
        decodedtoken=jwt.verify(token,"hellototheworld");
        console.log(decodedtoken);
    }
    catch(error)
    {
        next(new Error("Not Authenticated"))
    }
    //Authantication
    request.role=decodedtoken.role;

}