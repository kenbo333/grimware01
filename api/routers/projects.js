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
    return res.status(500).json({ error: "Failed to create a new project." });
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
    return res
      .status(500)
      .json({ error: "Failed to bulk insert monthlyReport." });
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
    return res.status(500).json({ error: "Failed to fetch project." });
  }
});

router.get("/:projectId/monthlyReports", async (req, res) => {
  try {
    const items = await prisma.monthlyReport.findMany({
      where: {
        fk_projectId: req.params.projectId,
      },
      include: {
        project: {
          select: {
            projectId: true,
            name: true,
            primeCompany: {
              select: {
                name: true,
                closingDay: true,
              },
            },
          },
        },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch monthlyReport." });
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
    return res.status(500).json({ error: "Failed to update the project." });
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
    return res
      .status(500)
      .json({ error: "Failed to update the monthlyReport." });
  }
});

//------delete-----------------------
router.delete("/:projectId", async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.projectId } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the project." });
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
