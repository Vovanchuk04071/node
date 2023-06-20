const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers/constants");
const add = async (req, res) => {
  const contact = await Contacts.create(req.body);

  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    payload: { contact },
  });
};

module.exports = add;
