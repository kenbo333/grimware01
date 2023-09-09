const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//-----------post-----------------------
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
      data: { fk_car: req.params.carId },
    });
    return res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Failed to create a new maintenance." });
  }
});

//-----------get---------------------------
const getIsStatus = (query) => query.isStatus !== "false";

router.get("/", async (req, res) => {
  try {
    const isStatus = getIsStatus(req.query);
    const items = await prisma.car.findMany({
      where: {
        f_status: isStatus,
      },
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
        fk_car: req.params.carId,
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

//-----------put-----------------------
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

//
router.put("/:carId/maintenance/:id", async (req, res) => {
  const { updateData } = req.body;

  if (!updateData || !updateData.id || typeof updateData !== "object") {
    return res.status(400).json({ error: "Invalid or missing data." });
  }

  try {
    const updateItem = await prisma.carMaintenance.update({
      where: { id: updateData.id },
      data: updateData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update the maintenance record." });
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

router.delete("/:carId/maintenance/:id", async (req, res) => {
  try {
    await prisma.carMaintenance.delete({
      where: {
        id: req.params.id,
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
