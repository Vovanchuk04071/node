const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      match: [
        /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      require: true,
    },
    phone: {
      type: String,
      match: [/^\+380\d{9}$/, "phone number must be in format +380XXXXXXXXX"],
      require: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contacts = model("contacts", contactSchema);

const createContactValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string()
    .pattern(/^\+38\d{10}$/)
    .required()
    .messages({
      "string.pattern.base": `phone number must be in format +380XXXXXXXXX`,
    }),
});

const updateContactValidation = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ["com", "net"],
      },
    })
    .optional(),
  phone: Joi.string()
    .pattern(/^\+38\d{10}$/)
    .optional()
    .messages({
      "string.pattern.base": `phone number must be in format +380XXXXXXXXX`,
    }),
});

const statusContactJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contacts,
  createContactValidation,
  updateContactValidation,
  statusContactJoiSchema,
};
