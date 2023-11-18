import userRouter from "./user.routes";
import defaultRouter from "./default.route";
import { Router } from "express";

let router = Router();

router.use("/user", userRouter);
router.use("/", defaultRouter);

export = router;
