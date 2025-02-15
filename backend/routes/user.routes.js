import express from "express";
import { followOrUnfollow } from "../controllers/user.controller.js";
import { firstcheck, isAuthenticated } from "../middlewares/isAuthenticated.js";    
import { editProfile, getProfile } from "../controllers/user.controller.js";
import { getSuggestions } from "../controllers/user.controller.js";
import { login } from "../controllers/user.controller.js";


import { logout } from "../controllers/user.controller.js";
import { register } from "../controllers/user.controller.js";
import upload from "../utils/multer.js";

const router=express.Router();
router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(isAuthenticated,logout)
router.route('/followOrUnfollow/:id').get(isAuthenticated,followOrUnfollow)

router.route('/suggestions').get(isAuthenticated,getSuggestions)
router.route('/:id/profile').get(isAuthenticated,getProfile);
router.route('/profile/edit').post(isAuthenticated,upload.single("profilepicture"),editProfile);
export default router;
