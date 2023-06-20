const { Contacts } = require("../../models");
const { HttpCode } = require("../../helpers/constants");

const removeById = async (req, res) => {
  const { contactId } = req.params;

  const contact = await Contacts.findByIdAndRemove(contactId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "contact deleted",
      payload: { contact },
    });
  }
};

module.exports = removeById;
