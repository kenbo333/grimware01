import axios from "axios";

// const baseURL = "http://localhost:5000/api";
// const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;
const baseURL = "http://192.168.100.101:5000/api";

export const apiClient = axios.create({
  baseURL: baseURL,
});

export const API_ENDPOINTS = {
  CAR_MAINTENANCE: {
    url: `${baseURL}/carMaintenances`,
    query: (sel) => `?fk_carId=${sel}`,
    body: (sel) => ({ fk_carId: sel }),
  },

  DAILY_REPORT: {
    url: `${baseURL}/dailyReports`,
    query: (sel) => `?fk_dailyId=${sel}`,
    body: (sel) => ({ fk_dailyId: sel }),
  },

  EXPENSE_DETAIL: {
    url: `${baseURL}/expenseDetails`,
    query: (sel) => `?fk_expenseId=${sel}`,
    body: (sel) => ({ fk_expenseId: sel }),
  },

  BRANCH_BANK_ACCOUNTS: {
    url: `${baseURL}/branchBankAccounts`,
    query: (sel) => `?fk_companyBranchId=${sel}`,
    body: (sel) => ({ fk_companyBranchId: sel }),
  },

  BRANCH_PERMIT_NOTICES: {
    url: `${baseURL}/branchPermitNotices`,
    query: (sel) => `?fk_companyBranchId=${sel}`,
    body: (sel) => ({ fk_companyBranchId: sel }),
  },

  PAID_REAVES: {
    url: `${baseURL}/paidLeaves`,
    query: (sel) => `?fk_companyEmployeeId=${sel}`,
    body: (sel) => ({ fk_companyEmployeeId: sel }),
  },

  MONTHLY_REPORTS_SUBS: {
    url: `${baseURL}/monthlyReportSubs`,
    query: (sel) => `?fk_monthlyReportId=${sel}`,
    body: (sel) => ({ fk_monthlyReportId: sel }),
  },
};
