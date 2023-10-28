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

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.project.findMany({});
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch project." });
  }
});

//-----update--------------------------------------
router.put("/:projectId", async (req, res) => {
  try {
    const updateItem = await prisma.project.update({
      where: { id: req.params.projectId },
      data: req.body.formData,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the project." });
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

module.exports = router;
