import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import router from "./routes";
import "reflect-metadata";
import { AppDataSource } from "./data-source";

dotenv.config();

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");

        const app: Application = express();
        const port = process.env.PORT || 8000;
        const routePrefix = process.env.API_V1 || "/api/v1";

        app.use(cors());
        app.use(express.json());
        app.use(routePrefix, router);

        app.listen(port, () => {
            console.log(`Server is Fire at http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
