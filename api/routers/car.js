const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//-----------get---------------------------
const getIsStatus = (query) => query.isStatus !== "false";

router.get("/", async (req, res) => {
  const isStatus = getIsStatus(req.query);
  try {
    const items = await prisma.car.findMany({
      where: {
        f_status: isStatus,
      },
      include: { carMaintenance: true },
    });
    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch cars." });
  }
});

router.get("/fuel", async (req, res) => {
  try {
    const items = await prisma.carFuelType.findMany({});
    return res.status(200).json(items);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch carFuelType." });
  }
});

//-----------create-----------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.car.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create a new car." });
  }
});

//-----------delete-----------------------
router.delete("/", async (req, res) => {
  try {
    if (!req.query.sel) {
      return res.status(400).json({ error: "ID is required to delete." });
    }

    await prisma.car.delete({ where: { id: req.query.sel } });
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to delete the car." });
  }
});

//-----------update-----------------------
router.put("/", async (req, res) => {
  try {
    if (!req.query.sel) {
      return res.status(400).json({ error: "ID is required to update." });
    }

    const updateItem = await prisma.car.update({
      where: { id: req.query.sel },
      data: req.body.formData,
    });
    return res.status(200).json(updateItem);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to update the car." });
  }
});

module.exports = router;
