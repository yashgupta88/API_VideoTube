import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { getAllSubscribers, subscribedChannels, toggleSubscription } from "../controllers/subscription.controller";
import { verify } from "jsonwebtoken";

const router = Router()

router.route("/toggle-Subscription/:channelId").post(
    verifyJWT,
    toggleSubscription

)

router.route("/get-All-Subscribers").get(
    verifyJWT,
    getAllSubscribers
)

router.route("/get-Subscribed-Channels").get(
    verifyJWT,
    subscribedChannels
)

export default router