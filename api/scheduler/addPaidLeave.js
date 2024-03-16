const { PrismaClient } = require("@prisma/client");
const formatDateToString = require("./format");
const prisma = new PrismaClient();

/**
 * 年数差に基づいて有給休暇の日数を計算します。
 * @param {number} year 年数差
 * @returns {number} 有給休暇の日数
 */
const calculateGrantDay = (year) => {
  // 年数差に応じた有給休暇の日数を返します。
  if (year === 0) return 10;
  if (year === 1) return 11;
  if (year === 2) return 12;
  if (year === 3) return 14;
  if (year === 4) return 16;
  if (year === 5) return 18;
  if (year > 5) return 20;
};

/**
 * 自社の従業員に対して有給休暇を付与します。
 */
const addPaidLeave = async () => {
  // 自社の従業員を検索します。
  const ownCompany = await prisma.company.findFirst({
    where: { isOwn: true },
    select: {
      companyEmployee: {
        where: { isStatus: true },
        select: { id: true, entryDate: true },
      },
    },
  });

  if (!ownCompany) return;

  const emps = ownCompany.companyEmployee;

  for (const emp of emps) {
    if (!emp.entryDate) continue; // 入社日がない従業員はスキップ

    // 入社日から6ヶ月後の日付を計算します。
    const entryDate = new Date(emp.entryDate);
    const sixMonthsLater = new Date(
      entryDate.getFullYear(),
      entryDate.getMonth() + 6,
      entryDate.getDate()
    );

    // 今日の日付を取得し、時間をリセットします。
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 入社日の6ヶ月後が今日の日付と一致するか確認します。
    if (
      sixMonthsLater.getMonth() === today.getMonth() &&
      sixMonthsLater.getDate() === today.getDate()
    ) {
      // 月日が一致する場合、有給休暇を付与します。
      const yearDiff = today.getFullYear() - sixMonthsLater.getFullYear();
      const grantDay = calculateGrantDay(yearDiff);

      // 有給休暇の期限を設定します（2年後の1日前）。
      const twoYearsLater = new Date(today);
      twoYearsLater.setFullYear(twoYearsLater.getFullYear() + 2);
      twoYearsLater.setDate(twoYearsLater.getDate() - 1);

      // 有給休暇データをデータベースに保存します。
      await prisma.paidLeave.create({
        data: {
          fk_companyEmployeeId: emp.id,
          grantDate: formatDateToString(today),
          grantDay: grantDay,
          expirationDate: formatDateToString(twoYearsLater),
        },
      });
    }
  }
};

module.exports = addPaidLeave;
