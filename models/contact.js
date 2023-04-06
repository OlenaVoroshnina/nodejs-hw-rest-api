const { Schema, model } = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [30, 'Name must be less than 30 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const statusJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  statusJoiSchema,
};
