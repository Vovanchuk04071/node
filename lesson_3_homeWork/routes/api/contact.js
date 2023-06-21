const express = require("express");

const {
  createContactValidation,
  updateContactValidation,
  statusContactJoiSchema,
} = require("../../models");
const { ctrlWrapper, validate } = require("../../middlewares");
const {
  add,
  getAll,
  getById,
  updateById,
  removeById,
  updateStatus,
} = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(getAll));
router.get("/:contactId", ctrlWrapper(getById));
router.post("/", validate(createContactValidation), ctrlWrapper(add));
router.delete("/:contactId", ctrlWrapper(removeById));
router.put(
  "/:contactId",
  validate(updateContactValidation),
  ctrlWrapper(updateById)
);
router.patch(
  "/:contactId/status",
  validate(statusContactJoiSchema),
  ctrlWrapper(updateStatus)
);

module.exports = router;
