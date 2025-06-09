const { Router } = require("express");
const checkForAuthentication = require("../middlewares/authentication");
const getRandomCode = require("../utils/getRandomCode");
const prisma = require("../utils/db");
const router = Router();

router.get("/", checkForAuthentication("token"), async (req, res) => {
  try {
    const gadgets = await prisma.gadgets.findMany({
      where: {
        userId: req.user.id,
      },
    });
    if (!gadgets || gadgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No gadgets found for this user." });
    }

    gadgets.forEach((gadget) => {
      gadget.success_Probability = Math.floor(Math.random() * 31) + 70;
    });

    res.status(200).json(gadgets);
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", checkForAuthentication("token"), async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const codename = getRandomCode();
    const gadget = await prisma.gadgets.create({
      data: {
        name,
        codename: codename,
        userId: req.user.id,
      },
    });

    res.status(201).json({
      message: "Gadget created successfully",
      gadget: {
        id: gadget.id,
        name: gadget.name,
        codename: gadget.codename,
        userId: gadget.userId,
      },
    });
  } catch (error) {
    console.error("Error creating gadget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id", checkForAuthentication("token"), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, codename, status } = req.body;

    if (!name && !codename && !status) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update." });
    }

    const existing = await prisma.gadgets.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existing) {
      return res.status(404).json({ error: "Gadget not found." });
    }

    const updatedGadget = await prisma.gadgets.update({
      where: { id: parseInt(id) },
      data: { name, codename, status },
    });

    return res.status(200).json(updatedGadget);
  } catch (error) {
    console.error("Error updating gadget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", checkForAuthentication("token"), async (req, res) => {
  try {
    const { id } = req.params;

    const gadget = await prisma.gadgets.findUnique({
      where: { id: parseInt(id), userId: req.user.id },
    });

    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found." });
    }

    await prisma.gadgets.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Gadget deleted successfully." });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
