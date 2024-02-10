const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.project.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

router.post("/:projectId/monthlyReports/bulk", async (req, res) => {
  const { closingDates } = req.body;
  const data = closingDates.map((date) => ({
    closingDate: date,
    fk_projectId: req.params.projectId,
  }));

  try {
    const newItem = await prisma.monthlyReport.createMany({ data });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to bulk insert data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.project.findMany({
      include: {
        primeCompany: {
          select: {
            id: true,
            name: true,
            closingDay: true,
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

router.get("/:projectId", async (req, res) => {
  try {
    const items = await prisma.project.findUnique({
      where: {
        id: req.params.projectId,
      },
      select: {
        id: true,
        projectNumber: true,
        name: true,
        //テーブル
        monthlyReport: {
          orderBy: {
            closingDate: "desc",
          },
        },
        primeCompany: {
          select: {
            name: true,
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
router.put("/:projectId", async (req, res) => {
  try {
    const updateItem = await prisma.project.update({
      where: { id: req.params.projectId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

router.put("/:projectId/monthlyReports/:monthlyReportId", async (req, res) => {
  try {
    const updateItem = await prisma.monthlyReport.update({
      where: { id: req.params.monthlyReportId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

//------delete-----------------------
router.delete("/:projectId", async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.projectId } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the data." });
  }
});

// router.delete("/:projectId", async (req, res) => {
//   try {
//     await prisma.monthlyReport.delete({
//       // where: { id: req.params.projectId }
//     });
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Failed to delete the monthlyReport." });
//   }
// });

module.exports = router;
