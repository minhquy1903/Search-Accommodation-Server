import mongoose from 'mongoose';

import config from './config';

const connectMongoDB = () => {
  console.log(config.mongodb.url);
  mongoose
    .connect(config.mongodb.url, config.mongodb.option)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection error');
      console.log(err);
    });
};

export default connectMongoDB;
