const { setGoal } = require("./fundacion.controller");
const router = require("express").Router();

router.post("/uploadMetas", setGoal);
module.exports = router;
