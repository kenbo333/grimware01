const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/:companyBranchId/bankAccounts", async (req, res) => {
  try {
    const newItem = await prisma.bankAccount.create({
      data: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new bankAccount." });
  }
});

//-----------read---------------------------
router.get("/:companyBranchId/bankAccounts", async (req, res) => {
  try {
    const items = await prisma.bankAccount.findMany({
      where: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch bankAccount." });
  }
});

//-----update--------------------------------------
router.put(
  "/:companyBranchId/bankAccounts/:bankAccountId",
  async (req, res) => {
    try {
      const updateItem = await prisma.bankAccount.update({
        where: { id: req.params.bankAccountId },
        data: req.body.updateData,
      });
      return res.status(200).json(updateItem);
    } catch (error) {
      console.error(error);
      console.log(req.body);
      return res
        .status(500)
        .json({ error: "Failed to update the bankAccount." });
    }
  }
);

//------delete-----------------------
router.delete(
  "/:companyBranchId/bankAccounts/:bankAccountId",
  async (req, res) => {
    try {
      await prisma.bankAccount.delete({
        where: { id: req.params.bankAccountId },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the bankAccount." });
    }
  }
);

module.exports = router;
