const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//---------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.daily.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new daily." });
  }
});

router.post("/:dailyId/dailyReports", async (req, res) => {
  try {
    const newItem = await prisma.dailyReport.create({
      data: {
        fk_daily: req.params.dailyId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new dailyReport." });
  }
});

//-----------read--------------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.daily.findMany({});
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dailies." });
  }
});

router.get("/:dailyId/dailyReports", async (req, res) => {
  const { dailyId } = req.params;
  try {
    const items = await prisma.dailyReport.findMany({
      where: { fk_daily: dailyId },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch dailyReports." });
  }
});

//------update-------------------------------------------------
router.put("/:dailyId/dailyReports/:dailyReportId", async (req, res) => {
  try {
    const updateItem = await prisma.dailyReport.update({
      where: { id: req.params.dailyReportId },
      data: req.body.updateData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the dailyReport." });
  }
});

//-----------delete--------------------------------
router.delete("/:dailyId/dailyReports/:dailyReportId", async (req, res) => {
  try {
    await prisma.dailyReport.delete({
      where: {
        id: req.params.dailyReportId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete the dailyReport record." });
  }
});

module.exports = router;
