import express from 'express';
import config from './config/config';
import router from './routes/index.routes';
import connectMongoDB from './config/mongo.contect';
import morgan from 'morgan';

const app: express.Application = express();

const NAMESPACE = 'server';

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  next();
});

app.use(morgan('tiny'));

app.use(express.json());

app.use('/api', router);

app.listen(config.server.port, () => {
  connectMongoDB();
  console.log(`server is running at ${config.server.port}`);
});
