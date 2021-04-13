import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import IUser from '../interface/user.interface';

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      // validate: (value) => {
      //   if (!validator.isEmail(value)) {
      //     throw new Error({ error: "Invalid Email address" });
      //   }
      // },
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 11,
      unique: true,
      index: true,
      dropDups: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 7,
    },
    type: {
      type: Number,
      require: true,
    },
    money: Number,
  },
  {
    timestamps: true,
  },
);

UserSchema.pre<IUser>('save', async function (next) {
  // Hash the password before saving the user model
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
    console.log('hashing password');
  }
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
