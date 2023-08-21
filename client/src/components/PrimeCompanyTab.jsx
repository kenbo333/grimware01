import { FullNameForm, NameFrom_kana } from "./FormName";
import { TransactionType } from "./FormCheckbox";
import BranchInfoList from "./BranchInfoList";
import EmpInfoList from "./EmpInfoList";
import { useFormUpdate, usePathChange, useSaveData } from "@/utils/handle";
import apiClient from "../../lib/apiClient";
import { useRouter } from "next/router";
import { useState } from "react";
import { SelectStatus } from "./SelectStatus";

const PrimeCompanyTab = ({ companies, querySel }) => {
  const company = companies.find((item) => item.id === querySel);
  const branches = company.companyBranch;
  const emps = company.companyEmployee;
  const router = useRouter();

  //オブジェクトから配列を除去
  const { companyBranch, companyEmployee, ...initialData } = company;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject, updateCheckbox } = useFormUpdate(initialData);

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = () => {
    saveData();
    //元請会社のチェック||statusが不変時
    if (
      company.f_prime === formData.f_prime &&
      company.f_status === formData.f_status
    ) {
      //再レンダリング
      pathChange(formData.id, false);
    } else {
      //変更時、selを上に移動
      const index = companies.findIndex((item) => item.id === querySel);
      if (index) {
        pathChange(companies[index - 1].id, false);
      } else {
        pathChange("", false);
      }
    }
  };

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "店社", tab3: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //店社作成
  const handleCreateBranch = async () => {
    try {
      const response = await apiClient.post("/prime/branch/1", {
        fk_companyId: company.id,
      });
      const { id } = response.data;
      router.push({
        pathname: `/prime/branch/${company.id}`,
        query: { sel: id },
      });
      console.log(`create${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h3">{company.companyName}</div>
        </div>
        <div>
          <SelectStatus formData={formData} updateObject={updateObject} />
        </div>
      </div>

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
            <button type="button" className="btn btn-info" onClick={handleSave}>
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
          {branches.length ? (
            <BranchInfoList branches={branches} />
          ) : (
            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreateBranch}
            >
              新規登録
            </button>
          )}
        </div>

        {/* tab3 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab3" ? "show active" : ""
          } my-3`}
          id="tab3"
          role="tabpanel"
        >
          {emps.length ? (
            <EmpInfoList emps={emps} />
          ) : (
            <div>登録されていません</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimeCompanyTab;
