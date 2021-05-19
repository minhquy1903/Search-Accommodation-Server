import { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.model';
import IResponse from '../interface/response.interface';

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
  const user = await User.findOne({ phone });

  if (!user) throw new Error('Invalid login credentials');
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Invalid login credentials');
  }

  return user;
};

const signup = async (req: Request, res: Response) => {
  try {
    const isExist: boolean = await User.exists({ phone: req.body.phone });

    if (isExist) throw new String('phone number was existed');

    const user = {
      name: req.body.name,
      phone: req.body.phone,
      password: req.body.password,
      type: 1,
      money: 10000,
      active: false,
    };

    const newUser = await new User(user);
    newUser
      .save()
      .then(async (data) => {
        const { _id, name, phone, money, type, active } = data;
        console.log(data);

        const userInformation = {
          _id: _id,
          name: name,
          phone: phone,
          money: money,

          type: type,
          active: active,
        };

        const token = await generateAuthToken({
          _id: data._id,
        });

        const response: IResponse<any> = {
          result: true,

          data: { userInformation: userInformation, accessToken: token },

          error: null,
        };

        res.status(201).json({ data: response });
      })
      .catch((error) => {
        console.log(error);

        const response: IResponse<null> = {
          result: false,
          data: null,
          error: error,
        };

        res.status(200).json({ data: response });
      });
  } catch (error) {
    const response: IResponse<null> = {
      result: false,
      data: null,
      error: error,
    };

    res.status(200).json({ data: response });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const user = await findByCredentials(req.body);

    const userInfo = {
      _id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      money: user.money,
      type: user.type,
      active: user.active,
    };
    const token = await generateAuthToken({
      _id: user._id,
    });

    const response: IResponse<object> = {
      result: true,
      data: { userInformation: userInfo, accessToken: token },
      error: null,
    };

    res.status(200).json({ data: response });
  } catch (error) {
    console.log(error);

    const response: IResponse<null> = {
      result: false,
      data: null,
      error: error,
    };

    res.status(200).json({ data: response });
  }
};

const confirmPhone = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.params.phone;
    console.log(phoneNumber);
    await User.updateOne(
      { phone: phoneNumber },
      {
        $set: { active: true },
      },
    ).catch((error) => {
      const response: IResponse<string> = {
        result: false,
        data: 'update faild',
        error: error,
      };
      res.json({ data: response });
    });

    const response: IResponse<string> = {
      result: true,
      data: 'updated',
      error: null,
    };

    res.json({ data: response });
  } catch (error) {
    const response: IResponse<string> = {
      result: false,
      data: 'update faild',
      error: error,
    };
    res.json({ data: response });
  }
};

export default { signup, login, confirmPhone };