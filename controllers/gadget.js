const getRandomCode = require("../services/getRandomCode");
const prisma = require("../services/db");
async function getAllGadgets(req, res) {
  try {
    const gadgets = await prisma.gadget.findMany({
      where: {
        userId: req.user.id,
      },
      select: {
        id: true,
        name: true,
        codename: true,
        status: true,
      },
    });
    if (!gadgets || gadgets.length === 0) {
      return res
        .status(404)
        .json({ message: "No gadgets found for this user." });
    }

    gadgets.forEach((gadget) => {
      gadget.success_Probability = `${Math.floor(Math.random() * 31) + 70}%`;
    });

    res.status(200).json(gadgets);
  } catch (error) {
    console.error("Error fetching gadgets:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function createGadget(req, res) {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required." });
    }

    const gadgetExists = await prisma.gadget.findFirst({
      where: {
        name: name,
        userId: req.user.id,
      },
    });

    if (gadgetExists.status === "Decommissioned") {
      await prisma.gadget.update({
        where: { id: gadgetExists.id },
        data: { status: "Available" },
      });
      return res.status(200).json({
        message: "Gadget reactivated successfully",
        gadget: {
          id: gadgetExists.id,
          name: gadgetExists.name,
          codename: gadgetExists.codename,
          status: "Available",
        },
      });
    }

    if (gadgetExists) {
      return res
        .status(400)
        .json({ error: "Gadget with this name already exists." });
    }

    const codename = getRandomCode();
    const gadget = await prisma.gadget.create({
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
}

async function updateGadget(req, res) {
  try {
    const { id } = req.params;
    const { name, codename, status } = req.body;

    if (!name && !codename && !status) {
      return res
        .status(400)
        .json({ error: "At least one field is required to update." });
    }

    const existing = await prisma.gadget.findUnique({
      where: { id: id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Gadget not found." });
    }

    const updatedGadget = await prisma.gadget.update({
      where: { id: id },
      data: { name, codename, status },
    });

    return res.status(200).json({
      message: "Gadget updated successfully",
      gadget: {
        id: updatedGadget.id,
        name: updatedGadget.name,
        codename: updatedGadget.codename,
        userId: updatedGadget.userId,
      },
    });
  } catch (error) {
    console.error("Error updating gadget:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function deleteGadget(req, res) {
  try {
    const { id } = req.params;

    const gadget = await prisma.gadget.findUnique({
      where: { id: id, userId: req.user.id },
    });

    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found." });
    }

    await prisma.gadget.update({
      where: { id: id },
      data: { status: "Decommissioned" },
    });

    res.status(200).json({ message: "Gadget deleted successfully." });
  } catch (error) {
    console.error("Error deleting gadget:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllGadgets,
  createGadget,
  updateGadget,
  deleteGadget,
};
