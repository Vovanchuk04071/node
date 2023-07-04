const { User } = require("../../models");
const { HttpCode } = require("../../helpers");
const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { id } = req.user;

  await User.findByIdAndUpdate(id, { subscription });

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    data: {
      user: { subscription },
    },
  });
};

module.exports = updateSubscription;
