const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const convertToIntOrNull = require("../utils/dataConversionUtils");
const {
  getStartDayFromClosingDate,
} = require("../utils/getStartDayFromClosingDate");
const {
  mergeAndSumTotals,
  calculateMonthlyTotals,
  calculateTotalPricePerClosingDate,
} = require("../utils/totalCosts");
const { aggregateFinancials } = require("../utils/costs");
const prisma = new PrismaClient();

//------create--------------------------------
router.post("/", async (req, res) => {
  try {
    const newItem = await prisma.project.create({ data: req.body });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create a new data." });
  }
});

router.post("/:id/monthlyReports/bulk", async (req, res) => {
  const { closingDates } = req.body;
  const data = closingDates.map((date) => ({
    closingDate: date,
    fk_projectId: req.params.id,
  }));
  try {
    const newItem = await prisma.monthlyReport.createMany({ data });
    return res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to bulk insert data." });
  }
});

//-----------read---------------------------
router.get("/", async (req, res) => {
  try {
    const items = await prisma.project.findMany({
      include: {
        primeCompany: {
          select: {
            id: true,
            name: true,
            closingDay: true,
          },
        },
        chiefCompanyEmployee: { select: { firstName: true, lastName: true } },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const items = await prisma.project.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        projectNumber: true,
        name: true,
        monthlyReport: {
          include: { dailyReport: { select: { id: true } } },
          orderBy: { closingDate: "asc" },
        },
        primeCompany: { select: { name: true } },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

// 月報のコスト合計を返す(労務費,燃料代,etc,外注,経費,仕入)
router.get("/:id/totalCosts", async (req, res) => {
  try {
    // projectテーブルから(労務費,燃料代,etc,外注,経費)の金額を取得
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      select: {
        projectNumber: true,
        monthlyReport: {
          select: {
            closingDate: true,
            dailyReport: {
              select: {
                calcFuelCost: true, // 燃料代
                calcLaborCost: true, // 労務費
                etcFees: true, // etc
              },
            },
            monthlyReportSub: { select: { paymentAmount: true } }, // 外注費
            expenseDetail: { select: { amount: true } }, // 経費
          },
        },
      },
    });
    // purchaseDetailテーブルから仕入金額を取得(closingDateごとにpurchaseDetailテーブルを検索)
    const purchaseDetailsByClosingDate = await Promise.all(
      project.monthlyReport.map(async (report) => {
        const purchaseDetails = await prisma.purchaseDetail.findMany({
          where: {
            projectNumber: project.projectNumber,
            date: {
              lte: report.closingDate,
              gte: getStartDayFromClosingDate(report.closingDate),
            },
          },
          select: { totalPrice: true },
        });
        return {
          closingDate: report.closingDate,
          purchaseDetails,
        };
      })
    );
    return res
      .status(200)
      .json(
        mergeAndSumTotals(
          calculateMonthlyTotals(project),
          calculateTotalPricePerClosingDate(purchaseDetailsByClosingDate)
        )
      );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

// 月報毎の各コストの合計を返す(労務費,外注費,旅費交通費,仕入高,その他経費)
router.get("/:id/costs", async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      select: {
        projectNumber: true,
        name: true,
        contractAmount: true,
        monthlyReport: {
          select: {
            invoiceAmount: true,
            dailyReport: {
              select: {
                calcLaborCost: true, // 労務費
                calcFuelCost: true, // 旅費交通費1
                etcFees: true, // 旅費交通費2
              },
            },
            monthlyReportSub: { select: { paymentAmount: true } }, // 外注費
            expenseDetail: {
              select: {
                account: true, // 旅費交通費3,仕入高1､その他経費
                amount: true,
              },
            },
          },
        },
        purchaseDetail: { select: { totalPrice: true } }, // 仕入高2
      },
    });
    return res.status(200).json(aggregateFinancials(project));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

//-----update--------------------------------------
router.put("/:id", async (req, res) => {
  try {
    const intKeys = [
      "estimateAmount",
      "contractAmount",
      "contractAmountWithTax",
      "distance",
    ];
    let updatedBody = { ...req.body };
    convertToIntOrNull(updatedBody, intKeys);

    const updateItem = await prisma.project.update({
      where: { id: req.params.id },
      data: updatedBody,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

router.put("/:id/monthlyReports/:monthlyReportId", async (req, res) => {
  try {
    const updateItem = await prisma.monthlyReport.update({
      where: { id: req.params.monthlyReportId },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

//------delete-----------------------
router.delete("/:id", async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the data." });
  }
});

// router.delete("/:projectId", async (req, res) => {
//   try {
//     await prisma.monthlyReport.delete({
//       // where: { id: req.params.projectId }
//     });
//     return res.status(204).send();
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ error: "Failed to delete the monthlyReport." });
//   }
// });

module.exports = router;
