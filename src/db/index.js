import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const DBCONNECT = async () =>{
    try {
        const connectioninstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`DB CONNECTED!!,${connectioninstance.connection.host}`)
    } catch (error) {
        console.log("ERROR IN CONNCETING DATABASE:",error)
    }
}


export default DBCONNECT;