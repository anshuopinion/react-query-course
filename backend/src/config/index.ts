import dotenv from "dotenv";
dotenv.config();
export const DB_URL = process.env.MONGO_URI as string;
export const PORT = process.env.PORT as string;
