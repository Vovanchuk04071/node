const { HttpCode } = require("../helpers/constants");

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error.message);

    return res.status(HttpCode.BAD_REQUEST).json({
      status: "error",
      code: HttpCode.BAD_REQUEST,
      message: `Field: ${error.message.replace(/"/g, "")}`,
    });
  }
};

module.exports = validate;
