const aggregateFinancials = (projectData) => {
  let travelExpenses = 0; // 旅費交通費
  let laborCosts = 0; // 労務費
  let subcontractorCosts = 0; // 外注費
  let purchaseTotals = 0; // 仕入高
  let otherExpenses = 0; // その他経費
  let invoiceTotals = 0; // 請求金額

  projectData.monthlyReport.forEach((monthlyReport) => {
    // 請求金額に請求額を加算
    invoiceTotals += monthlyReport.invoiceAmount ?? 0;

    monthlyReport.dailyReport.forEach((dailyReport) => {
      // 旅費交通費に燃料費とETC料金を加算
      travelExpenses += dailyReport.calcFuelCost ?? 0;
      travelExpenses += dailyReport.etcFees ?? 0;
      // 労務費に労働コストを加算
      laborCosts += dailyReport.calcLaborCost ?? 0;
    });

    monthlyReport.monthlyReportSub.forEach((sub) => {
      // 外注費に支払額を加算
      subcontractorCosts += sub.paymentAmount;
    });

    monthlyReport.expenseDetail.forEach((expense) => {
      switch (expense.account) {
        case "旅費交通費":
          travelExpenses += expense.amount;
          break;
        case "仕入高":
          purchaseTotals += expense.amount;
          break;
        case "外注費":
          subcontractorCosts += expense.amount;
          break;
        default:
          otherExpenses += expense.amount;
      }
    });
  });

  // purchaseDetailからも仕入高の合計を計算
  purchaseTotals += projectData.purchaseDetail.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // 集計結果をオブジェクトとして返す
  return {
    projectNumber: projectData.projectNumber,
    name: projectData.name,
    contractAmount: projectData.contractAmount,
    travelExpenses,
    laborCosts,
    subcontractorCosts,
    purchaseTotals,
    otherExpenses,
    invoiceTotals,
  };
};

module.exports = { aggregateFinancials };
