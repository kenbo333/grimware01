const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/:companyBranchId/permitNotices", async (req, res) => {
  try {
    const newItem = await prisma.permitNotice.create({
      data: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new permitNotice." });
  }
});

//-----------read---------------------------
router.get("/:companyBranchId/permitNotices", async (req, res) => {
  try {
    const items = await prisma.permitNotice.findMany({
      where: {
        fk_companyBranch: req.params.companyBranchId,
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch permitNotice." });
  }
});

//-----update--------------------------------------
router.put(
  "/:companyBranchId/permitNotices/:permitNoticeId",
  async (req, res) => {
    try {
      const updateItem = await prisma.permitNotice.update({
        where: { id: req.params.permitNoticeId },
        data: req.body.updateData,
      });
      return res.status(200).json(updateItem);
    } catch (error) {
      console.error(error);
      console.log(req.body);
      return res
        .status(500)
        .json({ error: "Failed to update the permitNotice." });
    }
  }
);

//------delete-----------------------
router.delete(
  "/:companyBranchId/permitNotices/:permitNoticeId",
  async (req, res) => {
    try {
      await prisma.permitNotice.delete({
        where: { id: req.params.permitNoticeId },
      });
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Failed to delete the permitNotice." });
    }
  }
);

module.exports = router;
