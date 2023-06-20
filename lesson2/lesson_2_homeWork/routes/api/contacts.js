const express = require("express");

const {
  createContactValidation,
  updateContactValidation,
  statusContactJoiSchema,
} = require("../../models");
const { ctrlWrapper, validateBody } = require("../../middlewares");
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
router.post("/", validateBody(createContactValidation), ctrlWrapper(add));
router.delete("/:contactId", ctrlWrapper(removeById));
router.put(
  "/:contactId",
  validateBody(updateContactValidation),
  ctrlWrapper(updateById)
);
router.patch(
  "/:contactId/status",
  validateBody(statusContactJoiSchema),
  ctrlWrapper(updateStatus)
);

module.exports = router;
