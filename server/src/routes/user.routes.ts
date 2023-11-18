import { Router } from "express";
import { UserController } from "../controllers";

const userRouter = Router();

userRouter.get("/", UserController.get);
userRouter.post("/", UserController.create);
userRouter.post("/login", UserController.login);

export default userRouter;
