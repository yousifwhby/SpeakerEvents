
const express= require('express');
const { body,param,query } = require('express-validator');
const router = express.Router();
const controller =require("./../Controllers/eventController");


router.route("/events")
.get(controller.getallEvents)
.post(
    // [
    //     body("id").isInt().withMessage("id should be inger"),
    //     body("name").isAlpha().withMessage(" name should be string")
    //     .isLength({max:10}).withMessage("String length must be less than 10 char")
     
    // ],
    controller.addEvent)
.put(controller.updateEvent)
.delete(controller.deleteEvent);

router.get("/events/:id?",controller.getEventByID)

module.exports=router;