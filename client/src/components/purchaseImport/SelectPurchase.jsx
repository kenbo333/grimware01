import React, { useState } from "react";
import { useFetchSingle } from "../containers/useFetchData";

const SelectPurchase = () => {
  const [companyId, setCompanyId] = useState("");
  const [companyBranchId, setCompanyBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const {
    data: companies,
    error,
    isLoading,
  } = useFetchSingle("/companies?isPurchase=true&isStatus=true");
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleSelectCompany = (e) => {
    const { value } = e.target;
    setCompanyId(value);
    const selectedCompany = companies.find((company) => company.id === value);
    setBranches(selectedCompany ? selectedCompany.companyBranch : []);
  };

  const handleSelectBranch = (e) => {
    const { value } = e.target;
    setCompanyBranchId(value);
  };

  return (
    <div className="mt-3">
      <div className="row">
        <div className="col-6">
          <div className="row">
            <label className="col-form-label col-sm-3" htmlFor="companyId">
              仕入会社
            </label>
            <div className="col-sm">
              <select
                className="form-select"
                id="companyId"
                onChange={handleSelectCompany}
                value={companyId}
              >
                <option value=""></option>
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            <label
              className="col-form-label col-sm-3"
              htmlFor="companyBranchId"
            >
              店社
            </label>
            <div className="col-sm">
              <select
                className="form-select"
                id="companyBranchId"
                onChange={handleSelectBranch}
                value={companyBranchId}
              >
                <option value=""></option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPurchase;
