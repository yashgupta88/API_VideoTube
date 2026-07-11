import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getLikedVideos, toggleCommentLike, toggleTweetLike, toggleVideoLike } from "../controllers/like.controller";

const router= Router()


router.route("/toggle-Video-Like/:videoId").post(
    verifyJWT,
    toggleVideoLike
)
router.route("/toggle-Comment-Like/:commentId").post(
    verifyJWT,
    toggleCommentLike
)
router.route("/toggle-Tweet-Like/:tweetId").post(
    verifyJWT,
    toggleTweetLike
)
router.route("/get-Liked-Videos").get(
    verifyJWT,
    getLikedVideos
)

export default router