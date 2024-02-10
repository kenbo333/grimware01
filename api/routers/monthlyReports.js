const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getOneMonthAfter = (sel) => {
  // 入力された日付の形式を 'yyyy/mm/dd' から 'yyyy-mm-dd' に変更
  let formattedSel = sel.replace(/\//g, "-");
  // Date オブジェクトを作成
  let date = new Date(formattedSel);
  let originalMonth = date.getMonth();
  let originalDay = date.getDate();
  // 1か月加算
  date.setMonth(originalMonth + 1);
  let newMonth = date.getMonth();
  // 加算後の月が2ヶ月進んでしまっている場合（例えば、1月31日から2月がないため3月になる場合）
  if ((newMonth - originalMonth) % 12 > 1) {
    // 前の月の最終日に設定
    date = new Date(date.getFullYear(), newMonth, 0);
  }
  // yyyy-mm-dd 形式で結果を返す
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

//-----------read---------------------------
router.get("/", async (req, res) => {
  const { strDate } = req.query;
  try {
    const items = await prisma.monthlyReport.findMany({
      where: {
        closingDate: {
          gte: strDate,
          lt: getOneMonthAfter(strDate),
        },
      },
      include: {
        project: {
          select: {
            name: true,
            distance: true,
          },
        },
      },
    });
    return res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch data." });
  }
});

//------------update------------------------------
router.put("/:id", async (req, res) => {
  try {
    const updateItem = await prisma.monthlyReport.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.status(200).json(updateItem);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the data." });
  }
});

module.exports = router;
