import mongoose from "mongoose";

import config from "./config";

const connectMongoDB = () => {
  mongoose
    .connect(config.mongodb.uri, config.mongodb.option)
    .then(() => {
      console.log(`Database ${config.mongodb.uri} connection successful`);
    })
    .catch((err) => {
      console.error("Database connection error");
      console.log(err);
    });
};

export default connectMongoDB;
