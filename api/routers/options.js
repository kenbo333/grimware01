const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.option.create({
      data: {
        projType1: {
          create: {},
        },
        projType2: {
          create: {},
        },
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new option." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.option.findUnique({
      where: { id: "1" },
      include: {
        projType1: true,
        projType2: true,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch option." });
  }
});

//-----update--------------------------------------
router.put("/:optionId", async (req, res) => {
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

//------delete-----------------------------------
router.delete("/:carId", async (req, res) => {
  try {
    await prisma.car.delete({ where: { id: req.params.carId } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the car." });
  }
});

module.exports = router;
