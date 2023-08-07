import React, { useState } from "react";
import { FullNameForm, NameFrom_kana } from "./FormName";
import { TransactionType } from "./FormCheckbox";
import BranchInfoList from "./BranchInfoList";
import EmpInfoList from "./EmpInfoList";
import { useFormUpdate, useSaveData } from "@/utils/handle";

const PrimeDetail = ({ selectedCompany }) => {
  const branches = selectedCompany.companyBranch;
  const emps = selectedCompany.companyEmployee;

  //オブジェクトから配列を除去
  const { companyBranch, companyEmployee, ...initialData } = selectedCompany;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject, updateCheckbox } = useFormUpdate(initialData);

  //データベースに保存
  const { saveData } = useSaveData(formData);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "店社", tab3: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //
  const createCompany = (e) => {
    e.preventDefault();
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
            <button className="btn btn-info" onClick={saveData}>
              保存
            </button>
            <button className="btn btn-warning mx-3" onClick={createCompany}>
              新規作成
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
