import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

import userRoute from "./routes/user.route.js";

const app =express();
dotenv.config();

//middleware

app.use(cors())
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());


const PORT = process.env.PORT || 5001;
const URI = process.env.Mongodb_URI;

try {
    mongoose.connect(URI,{
      // useNewUrlParser: true,
      // useUnifiedTopology: true, 
    });
    console.log("Connected to MongooseDb");
  } catch (error) {
    console.log(error);
  }

  app.use("/user",userRoute);
//   app.use("/user",userRoute);
//   app.use("/api/message",messageRoute);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})