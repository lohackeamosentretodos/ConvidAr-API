const {
  setGoal,
  RegisterFoundation,
  login,
  insertPost
} = require("./fundacion.controller");
const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

var multer  = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '');
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, 'imagenes/' + file.originalname);
    }
});
var upload = multer({storage: storage});

router.post("/uploadMetas", checkToken, setGoal);
router.post("/register", RegisterFoundation);
router.post("/insertPost", upload.single('file'), checkToken, insertPost);
router.post("/login", login);

module.exports = router;
