import React, { useState } from "react";
import { useFetchSingle } from "../containers/useFetchData";
import ExcelReader from "./ExcelReader";

const SelectInput = ({ id, value, onChange, options, label }) => (
  <div className="row">
    <label className="col-form-label col-sm-3" htmlFor={id}>
      {label}
    </label>
    <div className="col-sm">
      <select className="form-select" id={id} onChange={onChange} value={value}>
        <option value=""></option>
        {options.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

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
    const selectedCompany = companies.find(({ id }) => id === value);
    setBranches(selectedCompany ? selectedCompany.companyBranch : []);
    setCompanyBranchId(""); // 店舗の選択をリセット
  };

  const handleSelectBranch = (e) => setCompanyBranchId(e.target.value);

  return (
    <div className="container-lg">
      <div className="row mt-3">
        <div className="col-6">
          <SelectInput
            id="companyId"
            value={companyId}
            onChange={handleSelectCompany}
            options={companies}
            label="仕入会社"
          />
          <SelectInput
            id="companyBranchId"
            value={companyBranchId}
            onChange={handleSelectBranch}
            options={branches}
            label="店社"
          />
        </div>
      </div>

      <ExcelReader companyId={companyId} companyBranchId={companyBranchId} />
    </div>
  );
};

export default SelectPurchase;
