import { Router } from "express";
import { UserController } from "../controllers";
import { Auth } from "../middlewares";

const userRouter = Router();

userRouter.get("/", Auth, UserController.get);
userRouter.post("/", UserController.create);
userRouter.post("/login", UserController.login);

export default userRouter;
