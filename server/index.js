import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import connection from "./modals/connection.js";
const app = express();
connection();

import userRoute from "./routes/userRoute.js";
import generalRoute from "./routes/generalRoute.js";
import postRoute from "./routes/postRoute.js";

// let origins = ["https://social-net-five.vercel.app", "http://localhost:5173"];

app.use(
  cors({ origin: "https://social-net-five.vercel.app", credentials: true })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/v1", userRoute);
app.use("/v1", generalRoute);
app.use("/v1", postRoute);

app.use((error, req, res, next) => {
  let { status = 402, message = "Something Broke!" } = error;
  console.log(status, message);
  next();
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port ${process.env.PORT}`);
});
