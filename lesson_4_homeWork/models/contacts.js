const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { versionKey: false, timestamps: true }
);

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
  favorite: Joi.boolean().default(false),
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
  favorite: Joi.boolean().optional(),
});

const statusContactJoiSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Contacts = model("contacts", contactSchema);

module.exports = {
  Contacts,
  createContactValidation,
  updateContactValidation,
  statusContactJoiSchema,
};
