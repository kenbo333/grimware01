const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFiscalYear = (closingMonth) => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;

  return ((month <= closingMonth ? year - 1 : year) % 100)
    .toString()
    .padStart(2, "0");
};

const getNextProjectNumber = async (prefix) => {
  const lastProject = await prisma.project.findFirst({
    where: { projectNumber: { startsWith: prefix } },
    orderBy: { projectNumber: "desc" },
  });

  return lastProject ? parseInt(lastProject.projectNumber.slice(-4)) + 1 : 1;
};

//------create----------------------------------------------------------------
router.post("/", async (req, res) => {
  const { selectType, closingMonth, newFormData } = req.body;

  if (!selectType || selectType.length !== 2 || !closingMonth) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const prefix = getFiscalYear(closingMonth) + selectType;
    const nextNumber = await getNextProjectNumber(prefix);
    const newProjectNumber = `${prefix}${nextNumber
      .toString()
      .padStart(4, "0")}`;

    const newItem = await prisma.project.create({
      data: { projectNumber: newProjectNumber, ...newFormData },
    });

    return res.json(newItem);
  } catch (error) {
    console.error("Error creating project:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
