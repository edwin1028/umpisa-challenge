import userRouter from "./user.routes";
import defaultRouter from "./default.route";
import { Router } from "express";
import eventTypeRoute from "./event-type.route";
import myEventRoute from "./my-event.route";

let router = Router();

router.use("/", defaultRouter);
router.use("/user", userRouter);
router.use("/eventType", eventTypeRoute);
router.use("/myEvents", myEventRoute);

export = router;
