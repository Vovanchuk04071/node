const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers/constants");
const getAll = async (req, res) => {
  const contacts = await Contacts.find({});

  return res.json({ status: "success", code: HttpCode.OK, payload: contacts });
};

module.exports = getAll;
