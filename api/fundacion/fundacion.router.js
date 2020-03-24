const {
  setGoal,
  RegisterFoundation,
  login,
  insertPost
} = require("./fundacion.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.post("/uploadMetas", checkToken, setGoal);
router.post("/register", RegisterFoundation);
router.post("/insertPost", checkToken, insertPost);
router.post("/login", login);
module.exports = router;
