import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";

const app = express();

import userRoute from "./routes/userRoute.js";
import generalRoute from "./routes/generalRoute.js";
import postRoute from "./routes/postRoute.js";

let corsOpts = { origin: "http://localhost:5173", credentials: true };
app.use(cors(corsOpts));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", userRoute);
app.use("/", generalRoute);
app.use("/", postRoute);

app.use((error, req, res, next) => {
  let { status = 402, message = "Something Broke!" } = error;
  console.log(status, message);
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_UNAME}:${process.env.ATLAS_PWD}@socialnet.8zxi3qz.mongodb.net/?retryWrites=true&w=majority&appName=SocialNet`
  )
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Db & Server connected via Port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
