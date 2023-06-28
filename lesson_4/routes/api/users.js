const express = require("express");

const { auth, ctrlWrapper, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/avatars",
  auth,
  upload.single("avatars"),
  ctrlWrapper(ctrl.updateAvatar)
);
module.exports = router;
