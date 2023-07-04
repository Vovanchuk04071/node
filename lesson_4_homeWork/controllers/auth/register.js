const { User } = require("../../models");
const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const { HttpCode, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email, { s: "250" }, true);
  const verificationToken = uuidv4();

  await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  await sendEmail({
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a target="_blank" href="http://localhost:3005/api/users/verify/${verificationToken}">Підтвердіть реєстрацію</a>`,
  });

  res.status(HttpCode.CREATED).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
