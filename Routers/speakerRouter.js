
const express= require('express');
const { body,param,query } = require('express-validator');
const router = express.Router();
const controller =require("./../Controllers/speakerController");


router.route("/speakers")
.get(controller.getallSpeaker)
.post(
     [
       body("id").isInt().withMessage("id should be inger"),
    //     body("Email").isAlpha().withMessage(" name should be string")
    //     .isLength({max:10}).withMessage("String length must be less than 10 char")
     
     ],
    controller.addSpeakers)
.put(controller.updateSpeakers)
.delete(controller.deleteSpeakers);

router.get("/speakers/:id?",controller.getSpeakertByID)

module.exports=router;