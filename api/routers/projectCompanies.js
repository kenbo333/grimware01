const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//---------create-------------------------------------------
const bulkInsert = async (model, req, res) => {
  const { fk_projectId, companyIds } = req.body;
  const data = companyIds.map((id) => ({
    fk_companyId: id,
    fk_projectId,
  }));

  try {
    const items = await prisma[model].createMany({ data });
    return res.status(200).json(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Failed to bulk insert data" });
  }
};

router.post("/purchases/bulk", (req, res) =>
  bulkInsert("projectPurchase", req, res)
);
router.post("/subs/bulk", (req, res) => bulkInsert("projectSub", req, res));

//--------get---------------------------------------------------------------
const findAll = async (model, req, res) => {
  const projectId = req.params.projectId;

  try {
    const items = await prisma[model].findMany({
      where: {
        fk_projectId: projectId,
      },
      include: {
        company: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch the data" });
  }
};

router.get("/purchases/:projectId", (req, res) =>
  findAll("projectPurchase", req, res)
);
router.get("/subs/:projectId", (req, res) => findAll("projectSub", req, res));

//--------delete---------------------------------------------------------------
const deleteMany = async (model, req, res) => {
  const projectId = req.params.projectId;

  try {
    await prisma[model].deleteMany({
      where: {
        fk_projectId: projectId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the project." });
  }
};

router.delete("/purchases/:projectId", (req, res) =>
  deleteMany("projectPurchase", req, res)
);
router.delete("/subs/:projectId", (req, res) =>
  deleteMany("projectSub", req, res)
);

module.exports = router;
