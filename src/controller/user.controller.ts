import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../model/user.model';
dotenv.config();

const generateAuthToken = async (payload: object) => {
  const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!);
  return token;
};

const findByCredentials = async ({
  phone,
  password,
}: {
  phone: string;
  password: string;
}) => {
  console.log('password: ', password);
  console.log('phone: ', phone);

  const user = await User.findOne({ phone });
  console.log(user);

  if (!user) throw new Error('Invalid login credentials');
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }
  // console.log(user);

  return user;
};

const signup = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    // console.log(req.baseUrl);
    const newUser = await new User(user);
    newUser
      .save()
      .then((data) => {
        res.status(201).json({ user: data });
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await findByCredentials(req.body);
    const userInfo = {
      _id: user.id,
      name: user.name,
      phone: user.phone,
    };
    console.log(userInfo);

    const token = await generateAuthToken({
      _id: user._id,
    });

    res.status(200).json({ user: userInfo, token: token });
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: error });
  }
};

const getInformation = async (req: Request, res: Response) => {
  const userInfo = await User.findOne({ _id: req.params._id });
  if (userInfo == undefined) return res.status(400);
  res.status(200).send({ userInformation: userInfo });
};

export default { signup, login, getInformation };
