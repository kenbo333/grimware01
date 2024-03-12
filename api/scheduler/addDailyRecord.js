const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// 当日の日報レコード作成
const addDailyRecord = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`; // yyyy-mm-dd 形式

  try {
    await prisma.daily.create({
      data: { id: dateString },
    });
    console.log(`Record for ${dateString} added to daily table.`);
  } catch (error) {
    console.error("Error adding record to daily table:", error);
  }
};

module.exports = addDailyRecord;
