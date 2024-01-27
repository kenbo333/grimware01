const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//データベースにレコードを追加
const addDailyRecord = async () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`; // yyyy-mm-dd 形式

  try {
    await prisma.daily.create({
      data: {
        id: dateString,
      },
    });
    console.log(
      `${date.toLocaleString} Record for ${dateString} added to daily table.`
    );
  } catch (error) {
    console.error("Error adding record to daily table:", error);
  }
};

const scheduler = () => {
  // 0:10にスケジューラ開始
  cron.schedule("0 10 0 * * *", () => {
    addDailyRecord();
  });
};

module.exports = scheduler;
