// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// import DBCONNECT from "./db";

// configDotenv.({
//     path:'./env'
// })

import dotenv from "dotenv";
import DBCONNECT from "./db/index.js";
dotenv.config({
  path: "./env"
});



DBCONNECT()
.then(() =>{
  
})

// const app = express();

// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     console.log("✅ Connected to MongoDB");

//     app.on("error", (error) => {
//       console.log("🚨 APP ERROR:", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log("🚀 Server is listening on", process.env.PORT);
//     });
//   } catch (error) {
//     console.log("❌ ERROR CONNECTING TO DATABASE:", error);
//     throw error;
//   }
// })();
