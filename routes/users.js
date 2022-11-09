const router = require("express").Router();
const { updateUserValidation } = require("../midlewares/validation");

const { updateMe, getMe } = require("../controllers/users");

router.get("/me", getMe);
router.patch("/me", updateUserValidation, updateMe);

module.exports = router;
