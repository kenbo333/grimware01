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
      include: {
        carMaintenance: true,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch cars." });
  }
});

router.get("/fuel", async (req, res) => {
  try {
    const items = await prisma.carFuelType.findMany({});
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch carFuelType." });
  }
});

//-----------create-----------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.car.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new car." });
  }
});

router.post("/maintenance", async (req, res) => {
  try {
    const newItem = await prisma.carMaintenance.create({
      data: { fk_car: req.body.carId },
    });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to create a new maintenance." });
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the car." });
  }
});

router.delete("/maintenance/:id", async (req, res) => {
  try {
    await prisma.carMaintenance.delete({
      where: {
        id: req.params.id,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the car." });
  }
});

router.put("/maintenance", async (req, res) => {
  try {
    const updateItem = await prisma.carMaintenance.update({
      where: { id: req.body.updatedData.id },
      data: req.body.updatedData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the car." });
  }
});

module.exports = router;
