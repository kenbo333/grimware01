const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const convertToIntOrNull = require("../utils/dataConversionUtils");
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
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

//-----------read------------------------------------
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
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

//-----update--------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const intKeys = [
      "salesTaxRate",
      "allowanceDriving",
      "allowanceBusinessTrip",
      "allowanceNightMeal",
      "fuelRegular",
      "fuelPremium",
      "fuelDiesel",
    ];
    let updatedBody = { ...req.body };
    convertToIntOrNull(updatedBody, intKeys);
    console.log(updatedBody);

    const updateItem = await prisma.option.update({
      where: { id: req.params.id },
      data: updatedBody,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

router.put("/:optionId/projType1/:projType1Id", async (req, res) => {
  try {
    const updateItem = await prisma.projType1.update({
      where: { id: req.params.optionId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

router.put("/:optionId/projType2/:projType2Id", async (req, res) => {
  try {
    const updateItem = await prisma.projType2.update({
      where: { id: req.params.optionId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

//------delete-----------------------------------

module.exports = router;
