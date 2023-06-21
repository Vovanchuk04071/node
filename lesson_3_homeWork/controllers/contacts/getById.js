const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers/constants");
const getById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contacts.findById(contactId);

  if (contact) {
    return res.json({
      status: "success",
      code: HttpCode.OK,
      payload: { contact },
    });
  }

  return res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
};

module.exports = getById;
