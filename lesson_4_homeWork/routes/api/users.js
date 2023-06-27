const express = require("express");

const router = express.Router();
const {
  joiRegisterSchema,
  joiLoginSchema,
  joiSubscriptionSchema,
} = require("../../models");
const { ctrlWrapper, validate, auth } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");

router.post(
  "/register",
  validate(joiRegisterSchema),
  ctrlWrapper(ctrl.register)
);

router.post("/login", validate(joiLoginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.patch(
  "/",
  auth,
  validate(joiSubscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
module.exports = router;
