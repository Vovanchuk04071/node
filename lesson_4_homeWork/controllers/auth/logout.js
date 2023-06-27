const { User } = require("../../models");
const { HttpCode } = require("../../helpers/constants");
const logout = async (req, res) => {
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { token: null });
  res.status(HttpCode.LOGOUT).json();
};

module.exports = logout;
