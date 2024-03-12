const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { getOneMonthAfter } = require("../utils/conditions");
const prisma = new PrismaClient();

//-----------read---------------------------
router.get("/", async (req, res) => {
  const { strDate } = req.query;
  try {
    // where条件を動的に構築
    let whereCondition = {};
    if (strDate) {
      whereCondition.closingDate = {
        gte: strDate,
        lt: getOneMonthAfter(strDate),
      };
    }
    const items = await prisma.monthlyReport.findMany({
      where: whereCondition,
      include: {
        project: {
          select: {
            name: true,
            distance: true,
            projectNumber: true,
            primeCompany: { select: { name: true } },
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

//------------update------------------------------
router.put("/:id", async (req, res) => {
  const { dailyReport, ...updateData } = req.body;
  try {
    const updateItem = await prisma.monthlyReport.update({
      where: { id: req.params.id },
      data: updateData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

module.exports = router;
