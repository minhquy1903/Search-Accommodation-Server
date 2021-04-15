import { Document } from 'mongoose';

export default interface Post extends Document {
  start: Date;
  end: Date;
  amountOfRoom: number;
  type: number;
}
