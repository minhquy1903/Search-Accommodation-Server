const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 11,
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
    active: Boolean,
  },
  {
    timestamps: true,
  },
);

UserSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
