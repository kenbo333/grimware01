import { SelectForm } from "@/components/forms/InputForm";
import React, { useEffect, useState } from "react";
import ProjectModalCompany from "./ProjectModalCompany";
import { apiClient } from "../../../../lib/apiClient";
import { toast } from "react-toastify";

const PJStakeholder = (props) => {
  const { formUtils, sel } = props;
  const { formData } = formUtils;

  //仕入､下請会社
  const [purchases, setPurchases] = useState([]);
  const purchaseIds = purchases.map((purchase) => purchase.fk_companyId);
  const [subs, setSubs] = useState([]);
  const subIds = subs.map((sub) => sub.fk_companyId);

  //モーダル
  const [modalOpen, setModalOpen] = useState("");
  const modalOpenState = { modalOpen, setModalOpen };

  //自社select
  const [ownCompany, setOwnCompany] = useState([]);
  const branches = ownCompany.companyBranch;
  const emps = ownCompany.companyEmployee?.filter(
    (emp) => emp.fk_companyBranchId === formData.fk_companyBranchId_own
  );

  //自社情報取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/companies?isOwn=true");
        setOwnCompany(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  //仕入､下請取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPurchases, resSubs] = await Promise.all([
          apiClient.get(`/projectCompanies/purchases/${sel}`),
          apiClient.get(`/projectCompanies/subs/${sel}`),
        ]);
        setPurchases(resPurchases.data);
        setSubs(resSubs.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (sel || modalOpen === "edit") {
      fetchData();
      if (modalOpen === "edit") {
        setModalOpen("");
        toast.success("保存しました。");
      }
    }
  }, [sel, modalOpen]);

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
              <label className="col-form-label col-sm-3" htmlFor="isDedicate">
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
                  {emps?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {`${item.lastName} ${item.firstName}`}
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
          <div className="col-sm">
            <select
              className="form-select"
              id="fk_companyId_prime"
              onChange={(e) =>
                formUtils.updateObject(e.target.id, e.target.value)
              }
              value={formData["fk_companyId_prime"]}
              disabled
            >
              <option value={formData.fk_companyId_prime}>
                {formData.fk_companyId_prime}
              </option>
            </select>
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
              disabled
            >
              <option value={formData.fk_companyBranchId_prime}>
                {formData.fk_companyBranchId_prime}
              </option>
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
              disabled
            >
              <option value={formData.fk_companyEmployeeId_prime}>
                {formData.fk_companyEmployeeId_prime}
              </option>
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
            <ProjectModalCompany
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
            <ProjectModalCompany
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
