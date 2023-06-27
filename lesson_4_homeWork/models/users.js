const { Schema, model } = require("mongoose");
const Joi = require("joi");

const usersSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: [true, "Email is require"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const joiSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const User = model("users", usersSchema);

module.exports = {
  User,

  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
};
