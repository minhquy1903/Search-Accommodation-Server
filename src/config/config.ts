import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOST || 'localhost';

const MONGO_OPTION = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  autoIndex: true, //
};

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'minhquy';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '0964564273p';
const DATABASE_NAME = process.env.DATABASE_NAME || 'sativa_accommodation';
const MONGO_HOST = process.env.MONGO_URL || 'mink.c3zle.gcp.mongodb.net';

const MONGO = {
  host: MONGO_HOST,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  option: MONGO_OPTION,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${DATABASE_NAME}`,
};

const SERVER = {
  hostname: HOSTNAME,
  port: PORT,
};

const config = {
  server: SERVER,
  mongodb: MONGO,
};

export default config;
