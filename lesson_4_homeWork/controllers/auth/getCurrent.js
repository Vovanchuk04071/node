const { HttpCode } = require("../../helpers");

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(HttpCode.OK).json({
    statue: "success",
    code: HttpCode.OK,
    data: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrent;
