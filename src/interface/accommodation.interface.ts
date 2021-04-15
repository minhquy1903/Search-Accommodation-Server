import { Document } from 'mongoose';

interface IAccommodation extends Document {
  title: string;
  description: Array<string>;
  area: number;
  roomRetail: number;
  person: number;
  isReserve: boolean;
  type: number;
  address: IAddress;
}

interface IAddress extends Document {
  number: string;
  alley: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

interface IImage extends Document {
  src: string;
  alt: string;
}

export default IAccommodation;
