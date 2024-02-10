const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { queryObject } = require("../conditions");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.monthlyReportSub.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.monthlyReportSub.findMany({
      where: queryObject(req.query),
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

//------------update------------------------------
router.put("/:id", async (req, res) => {
  try {
    const keys = ["paymentAmount"]; //int型にしたいキーの配列
    let updatedBody = { ...req.body };
    keys.forEach((key) => {
      if (updatedBody[key] !== undefined) {
        const intValue = parseInt(updatedBody[key], 10);
        if (isNaN(intValue)) {
          console.error(`Invalid input for '${key}'.`);
        } else {
          updatedBody[key] = intValue;
        }
      }
    });
    const updateItem = await prisma.monthlyReportSub.update({
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
    await prisma.monthlyReportSub.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the data." });
  }
});

module.exports = router;
