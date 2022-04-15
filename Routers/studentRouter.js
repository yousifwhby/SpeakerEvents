
const express= require('express');
const { body,param,query } = require('express-validator');
const router = express.Router();
const controller =require("./../Controllers/studentController");


router.route("/students")
.get(controller.getallStudents)
.post(
    [
        body("id").isInt().withMessage("id should be inger"),
     //     body("Email").isAlpha().withMessage(" name should be string")
     //     .isLength({max:10}).withMessage("String length must be less than 10 char")
      
      ],
    controller.addStudent)
.put(controller.updateStudent)
.delete(controller.deleteStudent);

router.get("/students/:id?",controller.getStudentByID)

module.exports=router;