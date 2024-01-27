const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//------create-----------------------
router.post("/:companyEmployeeId/paidLeaves", async (req, res) => {
  try {
    const newItem = await prisma.paidLeave.create({
      data: {
        fk_companyEmployeeId: req.params.companyEmployeeId,
        grantDate: "2024-01-27",
        grantDay: 10,
        expirationDate: "2026-01-27",
      },
    });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Failed to create a new paidLeaves." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    // クエリパラメータを動的にwhere追加
    let queryOptions = {
      where: {},
    };
    for (const [key, value] of Object.entries(req.query)) {
      const operatorMatch = key.match(/(.*)(_(gt|gte|lt|lte))$/);
      if (operatorMatch) {
        // _で比較演算追加
        const [, fieldName, , operator] = operatorMatch;
        queryOptions.where[fieldName] = {
          ...queryOptions.where[fieldName],
          [operator]: value,
        };
      } else if (value === "true" || value === "false") {
        // booleanに変換
        queryOptions.where[key] = value === "true";
      } else {
        queryOptions.where[key] = value;
      }
    }

    const items = await prisma.paidLeave.findMany(queryOptions);
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch paidLeaves." });
  }
});

// //-----update--------------------------------------
// router.put(
//   "/:companyBranchId/branchBankAccounts/:branchBankAccountId",
//   async (req, res) => {
//     try {
//       const updateItem = await prisma.branchBankAccount.update({
//         where: { id: req.params.branchBankAccountId },
//         data: req.body,
//       });
//       return res.status(200).json(updateItem);
//     } catch (error) {
//       console.error(error);
//       return res
//         .status(500)
//         .json({ error: "Failed to update the branchBankAccount." });
//     }
//   }
// );

// //------delete-----------------------
// router.delete(
//   "/:companyBranchId/branchBankAccounts/:branchBankAccountId",
//   async (req, res) => {
//     try {
//       await prisma.branchBankAccount.delete({
//         where: { id: req.params.branchBankAccountId },
//       });
//       return res.status(204).send();
//     } catch (error) {
//       console.error(error);
//       return res
//         .status(500)
//         .json({ error: "Failed to delete the branchBankAccount." });
//     }
//   }
// );

module.exports = router;
