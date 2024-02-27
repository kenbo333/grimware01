// 労務費,燃料代,etc,外注,経費の月ごとの合計を計算
const calculateMonthlyTotals = (projectData) => {
  return projectData.monthlyReport.map((report) => {
    const dailyTotals = report.dailyReport.reduce((acc, cur) => {
      return (
        acc +
        (cur.calcFuelCost || 0) +
        (cur.calcLaborCost || 0) +
        (cur.etcFees || 0)
      );
    }, 0);
    const monthlySubTotals = report.monthlyReportSub.reduce((acc, cur) => {
      return acc + cur.paymentAmount;
    }, 0);
    const expenseDetailTotals = report.expenseDetail.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
    const totalCosts = dailyTotals + monthlySubTotals + expenseDetailTotals;
    return {
      closingDate: report.closingDate,
      totalCosts,
    };
  });
};

// 仕入の月ごとの合計を計算
const calculateTotalPricePerClosingDate = (purchaseData) =>
  purchaseData.map((item) => ({
    closingDate: item.closingDate,
    totalCosts: item.purchaseDetails.reduce(
      (acc, cur) => acc + cur.totalPrice,
      0
    ),
  }));

// 2つの配列を合計
const mergeAndSumTotals = (array1, array2) => {
  const merged = [...array1, ...array2];
  const result = merged.reduce((acc, cur) => {
    const index = acc.findIndex((item) => item.closingDate === cur.closingDate);
    if (index > -1) {
      acc[index].totalCosts += cur.totalCosts; // closingDateがすでに存在する場合、totalCostsを合算
    } else {
      acc.push(cur); // 存在しない場合、新しい要素として追加
    }
    return acc;
  }, []);
  return result;
};

module.exports = {
  calculateMonthlyTotals,
  calculateTotalPricePerClosingDate,
  mergeAndSumTotals,
};
