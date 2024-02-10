const express = require("express");
const cors = require("cors");

// ルーターのインポート
const companiesRoute = require("./routers/companies");
const companyBranchesRoute = require("./routers/companyBranches/companyBranches");
const carsRoute = require("./routers/cars");
const carMaintenancesRoute = require("./routers/carMaintenances");
const remarksRoute = require("./routers/remarks");
const bankAccountsRoute = require("./routers/companyBranches/branchBankAccounts");
const branchPermitNoticesRoute = require("./routers/companyBranches/branchPermitNotices");
const employeeLicensesRoute = require("./routers/companyEmployees/employeeLicenses");
const projectsRoute = require("./routers/projects");
const optionRoute = require("./routers/option");
const generateProjectNumberRoute = require("./routers/generateProjectNumber");
const projectCompaniesRoute = require("./routers/projectCompanies");
const dailiesRoute = require("./routers/dailies");
const dailyReportsRoute = require("./routers/dailyReports");
const monthlyReportsRoute = require("./routers/monthlyReports");
const expensesRoute = require("./routers/expenses");
const expenseDetailsRoute = require("./routers/expenseDetails");
const paidLeavesRoute = require("./routers/companyEmployees/paidLeaves");
const MonthlyReportSubsRoute = require("./routers/monthlyReportSubs");

// スケジューラのインポート
const scheduler = require("./scheduler/scheduler");

const app = express();
const PORT = 5000;

// スケジューラの実行
scheduler();

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルートの設定
app.use("/api/companies", companiesRoute);
app.use("/api/companyBranches", companyBranchesRoute);
app.use("/api/cars", carsRoute);
app.use("/api/carMaintenances", carMaintenancesRoute);
app.use("/api/remarks", remarksRoute);
app.use("/api/branchBankAccounts", bankAccountsRoute);
app.use("/api/branchPermitNotices", branchPermitNoticesRoute);
app.use("/api/companyEmployees", employeeLicensesRoute);
app.use("/api/paidLeaves", paidLeavesRoute);
app.use("/api/projects", projectsRoute);
app.use("/api/option", optionRoute);
app.use("/api/generateProjectNumber", generateProjectNumberRoute);
app.use("/api/projectCompanies", projectCompaniesRoute);
app.use("/api/dailies", dailiesRoute);
app.use("/api/dailyReports", dailyReportsRoute);
app.use("/api/monthlyReports", monthlyReportsRoute);
app.use("/api/expenses", expensesRoute);
app.use("/api/expenseDetails", expenseDetailsRoute);
app.use("/api/monthlyReportSubs", MonthlyReportSubsRoute);

// サーバーの起動
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
