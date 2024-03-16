const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { queryObject } = require("../../utils/conditions");
const convertToFloatOrNull = require("../../utils/dataConversionUtils");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.paidLeave.create({ data: req.body });
    // dailyReport:[]を追加したオブジェクトを返す
    return res.status(201).json({ ...newItem, dailyReport: [] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.paidLeave.findMany({
      where: queryObject(req.query),
      include: {
        dailyReport: {
          select: {
            fk_dailyId: true,
          },
        },
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
    const { dailyReport, ...updateData } = req.body;
    const updateItem = await prisma.paidLeave.update({
      where: { id: req.params.id },
      data: convertToFloatOrNull(updateData, ["grantDay"]),
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

// //------delete-----------------------
router.delete("/:id", async (req, res) => {
  try {
    await prisma.paidLeave.delete({
      where: { id: req.params.id },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the data." });
  }
});

module.exports = router;
