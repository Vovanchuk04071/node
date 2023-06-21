const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers/constants");

const getAl = async (req, res) => {
  const contacts = await Contacts.find({});

  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    payload: { contacts },
  });
};

module.exports = getAl;
