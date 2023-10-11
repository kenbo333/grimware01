import axios from "axios";

const baseURL = "http://localhost:5000/api";
// const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;

const apiClient = axios.create({
  baseURL: baseURL,
});

export const API_ENDPOINTS = {
  CAR_MAINTENANCE: `${baseURL}/cars/:id/maintenance`,
  BRANCH_BANK_ACCOUNTS: `${baseURL}/companyBranches/:id/branchBankAccounts`,
  BRANCH_PERMIT_NOTICES: `${baseURL}/companyBranches/:id/branchPermitNotices`,
};

export default apiClient;
