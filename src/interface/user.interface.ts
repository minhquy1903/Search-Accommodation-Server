import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  phone: string;
  email: string;
  password: string;
  type: number;
  money: number;
}
