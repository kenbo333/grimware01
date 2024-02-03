const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { queryObject } = require("../conditions");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.carMaintenance.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new carMaintenance." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.carMaintenance.findMany({
      where: queryObject(req.query),
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch carMaintenances." });
  }
});

//------------update------------------------------
router.put("/:id", async (req, res) => {
  try {
    const updateItem = await prisma.carMaintenance.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update the carMaintenance." });
  }
});

//------delete-----------------------
router.delete("/:id", async (req, res) => {
  try {
    await prisma.carMaintenance.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete the carMaintenance." });
  }
});

module.exports = router;
