const { Router } = require("express");
const checkForAuthentication = require("../middlewares/authentication");
const {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
} = require("../controllers/gadget");

const router = Router();

router.get("/", checkForAuthentication(), getAllGadgets);

router.post("/", checkForAuthentication(), createGadget);

router.patch("/:id", checkForAuthentication(), updateGadget);

router.delete("/:id", checkForAuthentication(), deleteGadget);

module.exports = router;
