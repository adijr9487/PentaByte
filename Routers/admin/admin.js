const router = require("express").Router();

router.post("/auth", require("./auth/auth"));
router.post("/complaint", require("./complaint/complaint"));
router.post("/resources", require("./resources/resources"));
router.post("/profile", require("./profile/profile"));

module.exports = router;
