import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";
import session from "express-session";

dotenv.config();
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        const app: Application = express();
        const port = process.env.PORT || 8000;
        const routePrefix = process.env.API_V1 || "/api/v1";

        app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
            })
        );
        app.use(express.json());
        app.use(
            session({
                secret: process.env.SESSION_KEY as string,
                resave: true,
                saveUninitialized: true,
                name: "sid",
                cookie: {
                    secure: process.env.NODE_ENV === "production",
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60, // '1hr'
                    sameSite:
                        process.env.NODE_ENV === "production" ? "none" : "lax",
                },
            })
        );
        app.use(routePrefix, router);

        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
