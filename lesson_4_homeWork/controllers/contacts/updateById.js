const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers");
const updateById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contacts.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (contact) {
    return res
      .status(HttpCode.OK)
      .json({ status: "success", code: HttpCode.OK, payload: { contact } });
  }

  return res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
};

module.exports = updateById;
