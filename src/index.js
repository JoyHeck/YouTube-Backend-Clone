// require("dotenv").config.config({ path: "./env" });

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()

app.on("Error", (error) => {
      console.log("Error in DB connection.", error);
      throw error;
    })

.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at ${process.env.PORT} PORT.`)
    })
})
.catch((error) =>{
    console.log("MONGO DB Connection failed!!",error);
    process.exit(1);    
})

// import express from "express";
// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI} / ${DB_NAME}`);
//     app.on("Error", (error) => {
//       console.log("Error in DB connection.", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is listening on PORT ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.error("Error: ", error);
//     throw error;
//   }
// })();
