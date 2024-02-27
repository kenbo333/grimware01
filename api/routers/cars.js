const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const convertToIntOrNull = require("../utils/dataConversionUtils");
const { queryObject } = require("../utils/conditions");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.car.create({ data: {} });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.car.findMany({
      where: queryObject(req.query),
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

//-----update--------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const intKeys = ["fuelConsumption"];
    let updatedBody = { ...req.body };
    convertToIntOrNull(updatedBody, intKeys);
    const updateItem = await prisma.car.update({
      where: { id: req.params.id },
      data: updatedBody,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

//------delete-----------------------
router.delete("/:id", async (req, res) => {
  try {
    await prisma.car.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the data." });
  }
});

module.exports = router;
