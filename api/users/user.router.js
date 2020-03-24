const {
  getFoundations,
  getFeedback,
  getFoundationGoals,
  pagar,
  login
} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

router.get("/inicio", getFoundations);
router.get("/donar/:id_fundacion", getFoundationGoals);
router.get("/feedback", getFeedback);
router.post("/realizar/:id_fundacion", pagar);

//router.post("/login", login);
// router.get("/inicio", checkToken, getUsers);
// router.get("/:id_fundacion", checkToken, getUsersByUserId);
// router.get("/feedback", checkToken, updateUser);
// router.post("/login", login);

module.exports = router;
