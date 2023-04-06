const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const subscriptionType = ['starter', 'pro', 'business'];

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      match: [emailRegex, 'Please enter a valid email'],
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionType,
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiRegisterSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string().valid(...subscriptionType),
  token: Joi.string(),
});

const joiLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(6).required(),
});

const User = model('user', userSchema);

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
};
