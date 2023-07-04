const Mailgun = require("mailgun.js");
const formData = require("form-data");

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "Vova",
  key: process.env.MAILGUN_API_KEY,
});

const { MAILGUN_DOMAIN } = process.env;

const sendEmail = async (data) => {
  const email = { ...data, from: "vovanchuk04071@gmail.com" };

  try {
    await mg.messages.create(MAILGUN_DOMAIN, email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
