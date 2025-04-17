import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";

dotenv.config();

const DBCONNECT = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`✅ DB CONNECTED!! ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("❌ ERROR IN CONNECTING DATABASE:", error);
    }
};

export default DBCONNECT;
