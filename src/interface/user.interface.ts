import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  phone: string;
  password: string;
  money: number;
  type: number;
  active: boolean;
}
