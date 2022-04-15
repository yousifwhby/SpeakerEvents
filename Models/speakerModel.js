const mongoose=require('mongoose');

let speakerSchema= new mongoose.Schema({
    _id: {type:mongoose.Types.ObjectId},
    Email:{type:String,unique:true},
    Password:{type:String,required:true},
    Address:{
        City:String,
        Street:String,
        Building:String

    }


});
 module.exports=mongoose.model("students",speakerSchema);
 