import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createComment, deleteComment, fetchAllComments, updateComment } from "../controllers/comment.controller.js";



const router=Router();


router.route("/create-comment/:videoId").post(
    verifyJWT,
    createComment
)
router.route("/update-comment/:commentId").patch(
    verifyJWT,
   updateComment
)
router.route("/delete-comment/:commentId").delete(
    verifyJWT,
    deleteComment
)
router.route("/fetch-All-Comments/:videoId").get(
    
    fetchAllComments
)


export default router