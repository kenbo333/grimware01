const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.car.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new car." });
  }
});

router.post("/:carId/maintenance", async (req, res) => {
  try {
    const newItem = await prisma.carMaintenance.create({
      data: { fk_carId: req.params.carId },
    });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to create a new maintenance." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const isStatus = req.query.isStatus !== "false";

    const items = await prisma.car.findMany({
      where: { isStatus },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch cars." });
  }
});

router.get("/:carId/maintenance", async (req, res) => {
  try {
    const items = await prisma.carMaintenance.findMany({
      where: {
        fk_carId: req.params.carId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch carMaintenance." });
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

//-----update--------------------------------------
router.put("/:carId", async (req, res) => {
  try {
    const updateItem = await prisma.car.update({
      where: { id: req.params.carId },
      data: req.body.formData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the car." });
  }
});

router.put("/:carId/maintenance/:maintenanceId", async (req, res) => {
  try {
    const updateItem = await prisma.carMaintenance.update({
      where: { id: req.params.maintenanceId },
      data: req.body.updateData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update the maintenance record." });
  }
});

//------delete-----------------------
router.delete("/:carId", async (req, res) => {
  try {
    await prisma.car.delete({ where: { id: req.params.carId } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the car." });
  }
});

router.delete("/:carId/maintenance/:maintenanceId", async (req, res) => {
  try {
    await prisma.carMaintenance.delete({
      where: {
        id: req.params.maintenanceId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete the maintenance record." });
  }
});

module.exports = router;
