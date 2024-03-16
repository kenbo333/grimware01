const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * 当日の日付を"yyyy-mm-dd"形式で生成します。
 * @returns {string} "yyyy-mm-dd"形式の日付文字列
 */
const getTodayDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  // getMonth()は0から始まるので、1を加えて月を取得
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`; // "yyyy-mm-dd"形式の文字列を返す
};

/**
 * 当日の日報レコードをデータベースに追加します。
 */
const addDailyRecord = async () => {
  const dateString = getTodayDateString();

  try {
    // 日報レコードをデータベースに追加
    await prisma.daily.create({
      data: { id: dateString },
    });
    console.log(`Record for ${dateString} added to daily table.`);
  } catch (error) {
    console.error("Error adding record to daily table:", error);
  }
};

module.exports = addDailyRecord;
