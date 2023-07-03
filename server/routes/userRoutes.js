const {
  register,
  login,
  setAvatar,
  getAllUsers,
  firebaseLogin,
  checkUsername,
} = require("../controllers/userController");

const router = require("express").Router();

router.post("/checkusername", checkUsername);
router.post("/register", register);
router.post("/login", login);
router.post("/firebaselogin", firebaseLogin);
router.post("/setavatar/:id", setAvatar);
router.get("/allusers/:id", getAllUsers);

module.exports = router;
