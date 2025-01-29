import { Router } from "express";

import { sendMessage,getMessage } from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router=Router();
router.route('/send/:id').post(isAuthenticated,async(req,res,next)=>{
    console.log(req.body);
    next();
},sendMessage);
router.route('/all/:id').get(isAuthenticated,getMessage);
export default router;
