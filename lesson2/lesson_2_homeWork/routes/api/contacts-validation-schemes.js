const Joi = require("joi");

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

module.exports = { createContactValidation, updateContactValidation };
