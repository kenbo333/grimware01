const express = require("express");
const app = express();
const companiesRoute = require("./routers/companies");
const carsRoute = require("./routers/cars");
const remarksRoute = require("./routers/remarks");
const branchBankAccountsRoute = require("./routers/companyBranches/branchBankAccounts");
const branchPermitNoticesRoute = require("./routers/companyBranches/branchPermitNotices");
const employeeLicense = require("./routers/companyEmployees/employeeLicenses");

const cors = require("cors");

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/companies", companiesRoute);
app.use("/api/cars", carsRoute);
app.use("/api/remarks", remarksRoute);
app.use("/api/companyBranches", branchBankAccountsRoute);
app.use("/api/companyBranches", branchPermitNoticesRoute);
app.use("/api/companyEmployees", employeeLicense);

app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));
