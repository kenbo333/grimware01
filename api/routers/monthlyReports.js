const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getReportStartDate = (dateString) => {
  let date = new Date(dateString);

  if (isNaN(date)) {
    throw new Error("Invalid date");
  }

  // 前月の同じ日を取得
  date.setMonth(date.getMonth() - 1);
  let targetDay = new Date(dateString).getDate();

  // 前月の最終日を取得
  let lastDayOfPreviousMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  // 前月に同じ日が存在しない場合、最終日を設定
  if (targetDay > lastDayOfPreviousMonth) {
    date.setDate(lastDayOfPreviousMonth);
  } else {
    date.setDate(targetDay);
  }

  // yyyy-mm-dd 形式で返す
  return date.toISOString().split("T")[0];
};

//-----------read---------------------------
router.get("/", async (req, res) => {
  const { sel } = req.query;
  const startDate = getReportStartDate(sel);

  try {
    const items = await prisma.monthlyReport.findMany({
      where: {
        closingDate: {
          gte: startDate, // closingDate が startDate 以上
          lte: sel, // closingDate が sel (締め切り日) 以下
        },
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch monthlyReports." });
  }
});

module.exports = router;
