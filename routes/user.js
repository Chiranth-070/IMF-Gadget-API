const { Router } = require("express");
const { handelSignUp, handelSigniIn } = require("../controllers/user");

const router = Router();

router.post("/signup", handelSignUp);

router.post("/login", handelSigniIn);

module.exports = router;
