import axios from "axios";

// const baseURL = "http://localhost:5000/api";
const baseURL = "http://192.168.100.101:5000/api";
// const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const apiClient = axios.create({
  baseURL: baseURL,
});

export const API_ENDPOINTS = {
  CAR_MAINTENANCE: `${baseURL}/cars/:id/maintenance`,
  DAILY_REPORT: `${baseURL}/dailies/:id/dailyReports`,
  EXPENSE_DETAIL: `${baseURL}/expenses/:id/expenseDetails`,
  BRANCH_BANK_ACCOUNTS: `${baseURL}/companyBranches/:id/branchBankAccounts`,
  BRANCH_PERMIT_NOTICES: `${baseURL}/companyBranches/:id/branchPermitNotices`,
};

export default apiClient;
