const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const {
  createContactValidation,
  updateContactValidation,
} = require("./contacts-validation-schemes");
const { validateBody } = require("../../middlewares/validation");
const { HttpCode } = require("../../helpers/constants");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();

  return res.json({ status: "success", code: HttpCode.OK, payload: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContactById(contactId);

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
});

router.post(
  "/",
  validateBody(createContactValidation),
  async (req, res, next) => {
    const contact = await addContact(req.body);

    return res
      .status(HttpCode.CREATED)
      .json({
        status: "success",
        code: HttpCode.CREATED,
        payload: { contact },
      });
  }
);

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await removeContact(contactId);

  if (contact) {
    return res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
      message: "contact deleted",
      payload: { contact },
    });
  }

  return res
    .status(HttpCode.NOT_FOUND)
    .json({ status: "error", code: HttpCode.NOT_FOUND, message: "Not found" });
});

router.put(
  "/:contactId",
  validateBody(updateContactValidation),
  async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

    if (contact) {
      return res
        .status(HttpCode.OK)
        .json({ status: "success", code: HttpCode.OK, payload: { contact } });
    }

    return res
      .status(HttpCode.NOT_FOUND)
      .json({
        status: "error",
        code: HttpCode.NOT_FOUND,
        message: "Not found",
      });
  }
);

module.exports = router;
