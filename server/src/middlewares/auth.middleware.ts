import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const Auth = (req: any, res: Response, next: NextFunction) => {
    const { token } = req.session;
    const [bearer, authToken] = (
        (req.headers?.authorization as string) || ""
    ).split(" ");

    if (
        !token &&
        (req.headers["user-agent"] as string)
            .toLowerCase()
            .includes("postman") &&
        process.env.NODE_ENV === "development" &&
        process.env.POSTMAN_TOKEN === authToken
    ) {
        next();
        return;
    }

    if (!token) {
        return res.status(401).json(["FAIL", "Unauthorized"]);
    }

    jwt.verify(
        token,
        process.env.JWT_KEY as string,
        (err: any, user: any) => {
            if (err) {
                return res.status(401).json(["FAIL", "Access Forbidden."]);
            }

            req.user = user;
            next();
        }
    );
};

export default Auth;
