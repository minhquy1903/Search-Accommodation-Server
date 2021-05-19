import mongoose from 'mongoose';

import config from './config';

const connectMongoDB = () => {
  console.log(config.mongodb.uri);
  mongoose
    .connect(config.mongodb.uri, config.mongodb.option)
    .then(() => {
      console.log('Database connection successful');
    })
    .catch((err) => {
      console.error('Database connection error');
      console.log(err);
    });
};

export default connectMongoDB;
