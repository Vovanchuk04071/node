const express = require("express");

const {
  createContactValidation,
  updateContactValidation,
  statusContactJoiSchema,
} = require("../../models");
const { ctrlWrapper, validate, auth } = require("../../middlewares");
const {
  add,
  getAll,
  getById,
  updateById,
  removeById,
  updateStatus,
} = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrlWrapper(getAll));
router.get("/:contactId", auth, ctrlWrapper(getById));
router.post("/", auth, validate(createContactValidation), ctrlWrapper(add));
router.delete("/:contactId", auth, ctrlWrapper(removeById));
router.put(
  "/:contactId",
  auth,
  validate(updateContactValidation),
  ctrlWrapper(updateById)
);
router.patch(
  "/:contactId/status",
  auth,
  validate(statusContactJoiSchema),
  ctrlWrapper(updateStatus)
);

module.exports = router;
