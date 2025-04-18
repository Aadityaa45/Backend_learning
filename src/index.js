// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
// import express from "express";
// import DBCONNECT from "./db";

// configDotenv.({
//     path:'./env'
// })

import dotenv from "dotenv";
import express from "express";
import DBCONNECT from "./db/index.js";
import app from "./app.js";
dotenv.config({
  path: "./env"
});



DBCONNECT()
.then(() =>{
  app.listen(process.env.PORT,()=>{
    console.log(`server is running on port:${process.env.PORT}`)
  })
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
