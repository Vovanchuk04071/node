const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers");

const add = async (req, res) => {
  const { _id } = req.user;
  console.log(req.user);
  const contact = await Contacts.create({ ...req.body, owner: _id });

  return res.status(HttpCode.CREATED).json({
    status: "success",
    code: HttpCode.CREATED,
    payload: { contact },
  });
};

module.exports = add;
