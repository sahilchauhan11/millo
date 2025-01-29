import { Router } from "express";
import { createPost,getAllPost,getSelfPost,likePost,unlikePost,addComment,postComment,deletePost,bookmarkPost } from "../controllers/post.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import upload from "../utils/multer.js";
const router=Router();
router.route('/addpost').post(isAuthenticated,upload.single('image'),createPost);
router.route('/allPost').get(isAuthenticated,getAllPost);
router.route('/userpost/all').get(isAuthenticated,getSelfPost);
router.route('/:id/like').get(isAuthenticated,likePost);
router.route('/:id/dislike').get(isAuthenticated,unlikePost);
router.route('/:id/comment').post(isAuthenticated,addComment);
router.route('/:id/comment/all').get(isAuthenticated,postComment);
router.route('/delete/:id').delete(isAuthenticated,deletePost);
router.route('/bookmark/:id').get(isAuthenticated,bookmarkPost);

export default router;
