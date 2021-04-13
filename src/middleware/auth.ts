import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string = req.headers['authorization']!;
  const token: string = authHeader && authHeader.split(' ')[1];
  console.log(process.env.ACCESS_TOKEN_SECRET);
  if (token === null)
    return res.status(400).send('Not authorized to access this resource');
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) res.status(400).send('Not authorized to access this resource');
    req.body = user;
    next();
  });
};

module.exports = auth;
