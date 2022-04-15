const mongoose=require('mongoose');

let studentSchema= new mongoose.Schema({
    _id: Number,
    Email:{type:String,unique:true},
    Password:{type:String,required:true}


});
 module.exports=mongoose.model("students",studentSchema);
 