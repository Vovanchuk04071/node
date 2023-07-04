const { HttpCode, sendEmail } = require("../../helpers");
const { User } = require("../../models");

const repeatEmailVerify = async (req, res, next) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "missing required field email",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(HttpCode.NOT_FOUND).json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "User not found",
      });
    }

    if (user.verify) {
      return res.status(HttpCode.BAD_REQUEST).json({
        status: "error",
        code: HttpCode.BAD_REQUEST,
        message: "Verification has already been passed",
      });
    }

    const { verificationToken } = user;

    await sendEmail({
      to: email,
      subject: "Підтвердження реєстрації на сайті",
      html: `<a href="http://localhost:3005/api/users/verify/${verificationToken}">Підтвердіть реєстрацію</a>`,
    });

    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "Verification email sent",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = repeatEmailVerify;
