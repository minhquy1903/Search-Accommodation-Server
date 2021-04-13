import express from 'express';
// import logging from './config/logging';
import config from './config/config';
import router from './routes/index.routes';
import connectMongoDB from './config/mongo.contect';

const app: express.Application = express();

const NAMESPACE = 'server';

// app.use((req: Request, res: Response, next: NextFunction) => {
//   logging.info(
//     NAMESPACE,
//     `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`,
//   );

//   res.on('finish', () => {
//     logging.info(
//       NAMESPACE,
//       `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`,
//     );
//   });
//   next();
// });

app.use(express.json());

app.use('/api', router);

app.listen(config.server.port, () => {
  connectMongoDB();
  console.log('server is running');
});
