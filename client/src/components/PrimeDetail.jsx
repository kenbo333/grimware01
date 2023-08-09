import React, { useState } from "react";
import { FullNameForm, NameFrom_kana } from "./FormName";
import { TransactionType } from "./FormCheckbox";
import BranchInfoList from "./BranchInfoList";
import EmpInfoList from "./EmpInfoList";
import { useFormUpdate, usePathChange, useSaveData } from "@/utils/handle";
import apiClient from "../../lib/apiClient";
import { useRouter } from "next/router";

const PrimeDetail = ({ selectedCompany }) => {
  const branches = selectedCompany.companyBranch;
  const emps = selectedCompany.companyEmployee;
  const router = useRouter();

  //オブジェクトから配列を除去
  const { companyBranch, companyEmployee, ...initialData } = selectedCompany;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject, updateCheckbox } = useFormUpdate(initialData);

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = (e) => {
    saveData(e);
    pathChange(formData.id, false);
  };

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "店社", tab3: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //店社作成
  const handleCreateBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/prime/branch/", {
        fk_companyId: selectedCompany.id,
      });
      const { id } = response.data;
      router.push({
        pathname: `/prime/branch/${selectedCompany.id}`,
        query: { sel: id },
      });
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ul className="nav nav-tabs">
        {Object.keys(tabs).map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabs[tab]}
            </button>
          </li>
        ))}
      </ul>

      {/* tab */}
      <div className="tab-content">
        {/* tab1 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab1" ? "show active" : ""
          } my-3`}
          id="tab1"
          role="tabpanel"
        >
          <form>
            <NameFrom_kana
              title="会社名"
              nameKey="companyName"
              formData={formData}
              updateObject={updateObject}
            />
            <FullNameForm
              title="代表者"
              formData={formData}
              updateObject={updateObject}
            />
            <TransactionType
              formData={formData}
              updateCheckbox={updateCheckbox}
            />
            <hr />
            <button className="btn btn-info" onClick={handleSave}>
              保存
            </button>
          </form>
        </div>

        {/* tab2 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab2" ? "show active" : ""
          } my-3`}
          id="tab2"
          role="tabpanel"
        >
          <BranchInfoList branches={branches} />

          <button
            type="button"
            className="btn btn-success"
            onClick={handleCreateBranch}
          >
            新規登録
          </button>
        </div>

        {/* tab3 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab3" ? "show active" : ""
          } my-3`}
          id="tab3"
          role="tabpanel"
        >
          <EmpInfoList emps={emps} />
        </div>
      </div>
    </div>
  );
};

export default PrimeDetail;
