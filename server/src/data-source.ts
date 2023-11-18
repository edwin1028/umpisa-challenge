import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 6543,
    username: "postgres",
    password: "supersecretpassword",
    database: "dbsample",
    synchronize: (process.env.NODE_ENV as string) === "development",
    logging: (process.env.NODE_ENV as string) === "development",
    entities: [User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.ts"],
    migrationsRun: true,
});
