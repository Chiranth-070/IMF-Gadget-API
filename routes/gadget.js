const { Router } = require("express");
const checkForAuthentication = require("../middlewares/authentication");
const {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
  selfDestruct,
} = require("../controllers/gadget");

const router = Router();

router.get("/", checkForAuthentication(), getAllGadgets);

router.post("/", checkForAuthentication(), createGadget);

router.patch("/:id", checkForAuthentication(), updateGadget);

router.delete("/:id", checkForAuthentication(), deleteGadget);

router.post("/:id/self-destruct", checkForAuthentication(), selfDestruct);

module.exports = router;
