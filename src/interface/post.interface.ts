import { Document } from 'mongoose';

export default interface IPost extends Document {
  timeStart: Date;
  timeEnd: Date;
  typePost: number;
  user_id: string;
  accommodation: IAccommodation;
}

export interface IAccommodation {
  title: string;
  description: Array<string>;
  area: number;
  retail: number;
  typeAccommdation: number;
  address: IAddress;
  images: Array<IImage>;
}

interface IAddress {
  street: string;
  ward: string;
  district: string;
  province: string;
}

interface IImage {
  src: string;
  alt: string;
}
