import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import dotenv from "dotenv";
import { UserSetting } from "./entity/UserSetting";

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseFloat(process.env.DB_PORT as string),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: (process.env.NODE_ENV as string) === "development",
    logging: (process.env.NODE_ENV as string) === "development",
    entities: [User, UserSetting],
    subscribers: [],
    migrations: [__dirname + "/migration/*.ts"],
    migrationsRun: false,
});
