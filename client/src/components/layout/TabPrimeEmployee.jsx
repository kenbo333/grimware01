import React, { useState } from "react";
import { SelectStatus } from "../forms/SelectStatus";
import {
  useFormUpdate,
  usePathChange,
  useSaveData,
} from "@/components/containers/handle";
import { SelectForm, FullNameForm, NameFrom } from "../forms/InputForm";
import { BirthdateForm } from "../forms/InputBirthdateForm";
import { AddressForm } from "../forms/InputAddressForm";

const TabPrimeEmployee = (props) => {
  const { branch, emps, querySel } = props;
  const emp = emps.find((item) => item.id === querySel);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "備考" };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { ...initialData } = emp;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormUpdate(initialData);
  const { formData } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = () => {
    saveData();
    //所属とstatusが不変時
    if (
      emp.fk_companyBranchId === formData.fk_companyBranchId &&
      emp.f_status === formData.f_status
    ) {
      //再レンダリング
      pathChange(formData.id, false);
    } else {
      //変更時、selを上に移動
      const index = emps.findIndex((item) => item.id === querySel);
      if (index) {
        pathChange(emps[index - 1].id, false);
      } else {
        pathChange("", false);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h1">{branch.company.companyName}</div>
          <div className="h4">{branch.branchName}</div>
          <div className="h4">
            {emp.lastName} {emp.firstName}
          </div>
        </div>
        <div>
          <SelectStatus formUtils={formUtils} />
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

      <div className="tab-content">
        {/* tab1 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab1" ? "show active" : ""
          } my-3`}
          id="tab1"
          role="tabpanel"
        >
          <div className="mb-2">
            <SelectForm
              title="所属"
              items={branch.company.companyBranch}
              nameKey={"fk_companyBranchId"}
              viewKey={"branchName"}
              isArrowEmpty={false}
              formUtils={formUtils}
            />
          </div>
          <div className="mb-2">
            <BirthdateForm formUtils={formUtils} />
          </div>
          <div className="mb-2">
            <FullNameForm title="氏名" formUtils={formUtils} />
          </div>
          <div className="mb-2">
            <NameFrom
              title="役職"
              nameKey="employmentStatus"
              formUtils={formUtils}
            />
            <NameFrom title="部署" nameKey="department" formUtils={formUtils} />
            <NameFrom title="TEL" nameKey="tel" formUtils={formUtils} />
            <NameFrom title="Email" nameKey="email" formUtils={formUtils} />
          </div>
          <div>
            <AddressForm formUtils={formUtils} />
          </div>

          <hr />

          <button type="button" className="btn btn-info" onClick={handleSave}>
            保存
          </button>
        </div>

        {/* tab2 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab2" ? "show active" : ""
          } my-3`}
          id="tab2"
          role="tabpanel"
        >
          tab2
        </div>
      </div>
    </div>
  );
};

export default TabPrimeEmployee;
