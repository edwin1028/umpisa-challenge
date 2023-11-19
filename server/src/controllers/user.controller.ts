import CryptoJS from "crypto-js";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { decrypt, hash, randomizeSalt } from "../utilities";
import jwt from "jsonwebtoken";
import { ISession } from "../interfaces/session.interface";

class UserController {
    async get(req: Request, res: Response, next: NextFunction) {
        res.status(200).json("UserController get works!");
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const { salt, encryptedSalt } = randomizeSalt();
        const salted = hash(
            `${salt}${password}`,
            process.env.HASH_KEY as string
        );

        try {
            const user = await AppDataSource.getRepository(User).findOneBy({
                email,
            });

            if (user) {
                throw new Error("Email already exist.");
            }

            await AppDataSource.getRepository(User).save({
                email,
                password: salted,
                salt: encryptedSalt,
            });

            res.status(200).json(["SUCCESS", "User created.", {}]); // status, message, data
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;

        try {
            const user = await AppDataSource.getRepository(User).findOneBy({
                email,
            });

            if (user) {
                const salt = decrypt(
                    user.salt,
                    process.env.ENCRYPT_KEY as string
                );
                const salted = hash(
                    `${salt}${password}`,
                    process.env.HASH_KEY as string
                );

                const validatedUser = await AppDataSource.getRepository(
                    User
                ).findOneBy({
                    email,
                    password: salted,
                });

                if (!validatedUser) {
                    throw new Error("Username or password does not match.");
                }

                const token = jwt.sign(
                    { id: validatedUser.id, email },
                    process.env.JWT_KEY as string,
                    {
                        expiresIn: "1h",
                    }
                );
                
                (req.session as ISession).token = token;
                (req.session as ISession).user = {
                    id: validatedUser.id,
                    email: validatedUser.email,
                };
                res.status(200).json([
                    "SUCCESS",
                    `Welcome back ${validatedUser.email}!`,
                    { ...validatedUser },
                ]); // status, message, data
            } else {
                throw new Error("Username or password does not match.");
            }
        } catch (error) {
            res.status(400).json(["FAIL", (error as any).message, error]);
        }
    }
}

export default new UserController();
