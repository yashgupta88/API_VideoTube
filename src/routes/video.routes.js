import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getVideoById, uploadVideo } from "../controllers/video.controller";
import { upload } from "../middlewares/multer.middleware";
const router=Router()

router.route("/upload-video").post(
    verifyJWT,
    upload.fields([
        {name:"videoFile"},{name:"thumbnail"}
    ]),
    uploadVideo
)
router.route("/getVideoById/:videoId").get( // taking videoId as a parameter 
    verifyJWT,
    getVideoById
)