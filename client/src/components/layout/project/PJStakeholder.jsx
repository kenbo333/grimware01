import { SelectForm } from "@/components/forms/InputForm";
import React, { useState } from "react";
import ProjectCompanyModal from "./ProjectCompanyModal";
import { useFetchMulti } from "@/components/containers/useFetchData";

const PJStakeholder = (props) => {
  const { formUtils, sel, primeCompanyId } = props;
  const { formData } = formUtils;

  //モーダル
  const [modalOpen, setModalOpen] = useState("");
  const modalOpenState = { modalOpen, setModalOpen };

  const urls = [
    "/companies?isOwn=true", //自社select
    `/companies/${primeCompanyId}`, //元請select
    `/projectCompanies/purchases/${sel}`,
    `/projectCompanies/subs/${sel}`,
  ];

  const { data, isLoading, isError, mutate } = useFetchMulti(urls);
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const [ownCompany, primeCompany, purchases, subs] = data;
  const purchaseIds = purchases.map((purchase) => purchase.fk_companyId);
  const subIds = subs.map((sub) => sub.fk_companyId);

  //自社select
  const branches = ownCompany[0].companyBranch;
  const emps = ownCompany[0].companyEmployee?.filter(
    (emp) => emp.fk_companyBranchId === formData.fk_companyBranchId_own
  );
  //元請select
  const primeBranches = primeCompany.companyBranch;
  const primeEmps =
    primeBranches.find(
      (primeBranch) => primeBranch.id === formData.fk_companyBranchId_prime
    )?.companyEmployee || [];

  //モーダル保存後､更新
  if (modalOpen === "edit") {
    mutate();
    setModalOpen("");
  }

  return (
    <div className="tab-pane active my-3">
      <div className="mb-2">
        <SelectForm
          title="担当"
          items={branches}
          nameKey="fk_companyBranchId_own"
          viewFn={(item) => item.name}
          isAllowEmpty={true}
          formUtils={formUtils}
        />
        <div className="row">
          <div className="col-10">
            <div className="row">
              <label
                className="col-form-label col-sm-3"
                htmlFor="fk_companyEmployeeId_chief"
              >
                主任技術者
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="fk_companyEmployeeId_chief"
                  onChange={(e) =>
                    formUtils.updateObject(e.target.id, e.target.value)
                  }
                  value={formData["fk_companyEmployeeId_chief"]}
                  disabled={!formData.isEditing}
                >
                  <option value=""></option>
                  {emps?.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {`${emp.lastName} ${emp.firstName}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-2 d-flex align-items-center justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="isDedicate"
                checked={formData.isDedicate || false}
                onChange={(e) => formUtils.updateCheckbox(e.target.id)}
                disabled={!formData.isEditing}
              />
              <label className="form-check-label" htmlFor="isDedicate">
                専任
              </label>
            </div>
          </div>
        </div>
        <SelectForm
          title="安全衛生"
          items={emps}
          nameKey="fk_companyEmployeeId_safety"
          viewFn={(item) => `${item.lastName} ${item.firstName}`}
          isAllowEmpty={true}
          formUtils={formUtils}
        />
        <SelectForm
          title="職長"
          items={emps}
          nameKey="fk_companyEmployeeId_foreman"
          viewFn={(item) => `${item.lastName} ${item.firstName}`}
          isAllowEmpty={true}
          formUtils={formUtils}
        />
      </div>

      <div className="mb-2">
        <div className="row">
          <label
            className="col-form-label col-sm-2"
            htmlFor="fk_companyId_prime"
          >
            元請会社
          </label>
          <div className="col-sm-10">
            <input
              className="form-control-plaintext mx-2"
              id="fk_companyId_prime"
              value={primeCompany.name}
              readOnly
            />
          </div>
        </div>
        <div className="row">
          <label
            className="col-form-label col-sm-2"
            htmlFor="fk_companyId_prime"
          >
            元請店
          </label>
          <div className="col-sm">
            <select
              className="form-select"
              id="fk_companyBranchId_prime"
              onChange={(e) =>
                formUtils.updateObject(e.target.id, e.target.value)
              }
              value={formData["fk_companyBranchId_prime"]}
              disabled={!formData.isEditing}
            >
              <option value=""></option>
              {primeBranches.map((primeBranch) => (
                <option key={primeBranch.id} value={primeBranch.id}>
                  {primeBranch.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <label
            className="col-form-label col-sm-2"
            htmlFor="fk_companyEmployeeId_prime"
          >
            担当
          </label>
          <div className="col-sm">
            <select
              className="form-select"
              id="fk_companyEmployeeId_prime"
              onChange={(e) =>
                formUtils.updateObject(e.target.id, e.target.value)
              }
              value={formData["fk_companyEmployeeId_prime"]}
              disabled={!formData.isEditing}
            >
              <option value=""></option>
              {primeEmps.map((primeEmp) => (
                <option key={primeEmp.id} value={primeEmp.id}>
                  {`${primeEmp.lastName} ${primeEmp.firstName}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-6">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="me-2">取引する仕入会社</span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalOpen("purchase")}
            >
              編集
            </button>
          </div>
          <ul className="list-group">
            {purchases.map((purchase) => (
              <li key={purchase.fk_companyId} className="list-group-item">
                {purchase.company.name}
              </li>
            ))}
          </ul>
          {modalOpen === "purchase" && (
            <ProjectCompanyModal
              modalOpenState={modalOpenState}
              sel={sel}
              ids={purchaseIds}
            />
          )}
        </div>

        <div className="col-6">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <span className="me-2">入場する下請会社</span>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setModalOpen("sub")}
            >
              編集
            </button>
          </div>
          <ul className="list-group">
            {subs.map((sub) => (
              <li key={sub.fk_companyId} className="list-group-item">
                {sub.company.name}
              </li>
            ))}
          </ul>
          {modalOpen === "sub" && (
            <ProjectCompanyModal
              modalOpenState={modalOpenState}
              sel={sel}
              ids={subIds}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PJStakeholder;
