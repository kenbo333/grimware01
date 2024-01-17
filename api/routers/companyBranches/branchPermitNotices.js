const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/:companyBranchId/branchPermitNotices", async (req, res) => {
  try {
    const newItem = await prisma.branchPermitNotice.create({
      data: {
        fk_companyBranchId: req.params.companyBranchId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new branchPermitNotice." });
  }
});

//-----------read---------------------------
router.get("/:companyBranchId/branchPermitNotices", async (req, res) => {
  try {
    const items = await prisma.branchPermitNotice.findMany({
      where: {
        fk_companyBranchId: req.params.companyBranchId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to fetch branchPermitNotice." });
  }
});

//-----update--------------------------------------
router.put(
  "/:companyBranchId/branchPermitNotices/:branchPermitNoticeId",
  async (req, res) => {
    try {
      const updateItem = await prisma.branchPermitNotice.update({
        where: { id: req.params.branchPermitNoticeId },
        data: req.body,
      });
      return res.status(200).json(updateItem);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to update the branchPermitNotice." });
    }
  }
);

//------delete-----------------------
router.delete(
  "/:companyBranchId/branchPermitNotices/:branchPermitNoticeId",
  async (req, res) => {
    try {
      await prisma.branchPermitNotice.delete({
        where: { id: req.params.branchPermitNoticeId },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the branchPermitNotice." });
    }
  }
);

module.exports = router;
