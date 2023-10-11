const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/:companyBranchId/branchBankAccounts", async (req, res) => {
  try {
    const newItem = await prisma.branchBankAccount.create({
      data: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new branchBankAccount." });
  }
});

//-----------read---------------------------
router.get("/:companyBranchId/branchBankAccounts", async (req, res) => {
  try {
    const items = await prisma.branchBankAccount.findMany({
      where: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch branchBankAccount." });
  }
});

//-----update--------------------------------------
router.put(
  "/:companyBranchId/branchBankAccounts/:branchBankAccountId",
  async (req, res) => {
    try {
      const updateItem = await prisma.branchBankAccount.update({
        where: { id: req.params.branchBankAccountId },
        data: req.body.updateData,
      });
      return res.status(200).json(updateItem);
    } catch (error) {
      console.error(error);
      console.log(req.body);
      return res
        .status(500)
        .json({ error: "Failed to update the branchBankAccount." });
    }
  }
);

//------delete-----------------------
router.delete(
  "/:companyBranchId/branchBankAccounts/:branchBankAccountId",
  async (req, res) => {
    try {
      await prisma.branchBankAccount.delete({
        where: { id: req.params.branchBankAccountId },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the branchBankAccount." });
    }
  }
);

module.exports = router;
