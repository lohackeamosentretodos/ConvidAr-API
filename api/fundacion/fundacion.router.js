const { setGoal, RegisterFoundation } = require("./fundacion.controller");
const router = require("express").Router();

router.post("/uploadMetas", setGoal);
router.post("/register", RegisterFoundation);
module.exports = router;
