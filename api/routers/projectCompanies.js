const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//---------create------------------------------------------------------------
router.post("/bulk", async (req, res) => {
  const { fk_project, companyIds } = req.body;

  const data = companyIds.map((id) => ({
    fk_project: fk_project,
    fk_companyId: id,
  }));

  try {
    const items = await prisma.projectPurchase.createMany({
      data: data,
    });
    return res.status(200).send(items);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//--------get---------------------------------------------------------------
router.get("/purchases/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const items = await prisma.projectPurchase.findMany({
      where: {
        fk_project: projectId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error" });
  }
});

//--------delete---------------------------------------------------------------
router.delete("/purchases/:projectId", async (req, res) => {
  const projectId = req.params.projectId;

  try {
    await prisma.projectPurchase.deleteMany({
      where: {
        fk_project: projectId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the project." });
  }
});
module.exports = router;
