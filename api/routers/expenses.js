const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//---------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.expense.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new expense." });
  }
});

router.post("/:expenseId/expenseDetails", async (req, res) => {
  try {
    const newItem = await prisma.expenseDetail.create({
      data: {
        fk_expenseId: req.params.expenseId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new expenseDetail." });
  }
});

//-----------read--------------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.expense.findMany({
      include: {
        companyEmployee: {
          select: { lastName: true, firstName: true },
        },
        expenseDetail: true,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch expenses." });
  }
});

router.get("/:expenseId/expenseDetails", async (req, res) => {
  const { expenseId } = req.params;
  try {
    const items = await prisma.expenseDetail.findMany({
      where: { fk_expenseId: expenseId },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch expenseDetails." });
  }
});

//------update-------------------------------------------------
router.put("/:expenseId", async (req, res) => {
  try {
    const updateItem = await prisma.expense.update({
      where: { id: req.params.expenseId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the expense." });
  }
});

router.put("/:expenseId/expenseDetails/:expenseDetailId", async (req, res) => {
  try {
    const updateItem = await prisma.expenseDetail.update({
      where: { id: req.params.expenseDetailId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to update the expenseDetail record." });
  }
});

//-----------delete--------------------------------
router.delete("/:expenseId", async (req, res) => {
  try {
    await prisma.expense.delete({
      where: {
        id: req.params.expenseId,
      },
    });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to delete the expense record." });
  }
});

router.delete(
  "/:expenseId/expenseDetails/:expenseDetailId",
  async (req, res) => {
    try {
      await prisma.expenseDetail.delete({
        where: {
          id: req.params.expenseDetailId,
        },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the expenseDetail record." });
    }
  }
);

module.exports = router;
