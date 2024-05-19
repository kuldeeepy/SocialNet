import mongoose from "mongoose";

let URL = process.env.MONGO_URL;

const connection = () => {
  mongoose
    .connect(URL)
    .then(() => {
      console.log(`Mongo Connected`);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default connection;
