const { User } = require("../../models");
const { HttpCode } = require("../../helpers");
const { NomFound } = require("http-errors");

const verifyEmail = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await User.findOne({ verificationToken });

    if (!user) {
      throw new NomFound("User not found");
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.json({
      status: "success",
      code: HttpCode.OK,
      message: "Verification successful",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = verifyEmail;
