const mongoose=require('mongoose');

let eventSchema= new mongoose.Schema({
    _id: Number,
    Email:{type:String,unique:true},
    Password:String


});
 module.exports=mongoose.model("events",eventSchema);
 