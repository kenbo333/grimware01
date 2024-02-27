const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { queryObject } = require("../utils/conditions");
const convertToIntOrNull = require("../utils/dataConversionUtils");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/bulk", async (req, res) => {
  try {
    const newItem = await prisma.purchaseDetail.createMany({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to bulk insert data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.purchaseDetail.findMany({
      where: queryObject(req.query),
      include: {
        company: {
          select: { name: true },
        },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

module.exports = router;
