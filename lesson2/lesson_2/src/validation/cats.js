const Joi = require("joi");
const { HttpCode } = require("../helpers/constants");

const schemaCreateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  age: Joi.number().integer().min(1).max(45).required(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateCat = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  age: Joi.number().integer().min(1).max(45).optional(),
  isVaccinated: Joi.boolean().optional(),
});

const schemaUpdateStatusCat = Joi.object({
  isVaccinated: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);

  if (error) {
    const [{ message }] = error.details;
    return next({
      status: HttpCode.BAD_REQUEST,
      message: `Field: ${message.replace(/"/g, "")}`,
      data: "Bad Request",
    });
  }

  next();
};

module.exports.validateCreateCat = (req, res, next) =>
  validate(schemaCreateCat, req.body, next);

module.exports.validateUpdateCat = (req, res, next) =>
  validate(schemaUpdateCat, req.body, next);

module.exports.validateUpdateStatusCat = (req, res, next) =>
  validate(schemaUpdateStatusCat, req.body, next);
