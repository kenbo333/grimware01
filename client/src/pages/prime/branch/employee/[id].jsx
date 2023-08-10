import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import { getCompany } from "../../../../utils/SSR";
import {
  AddressForm,
  BirthdateForm,
  FormSelect,
  FullNameForm,
  NameFrom,
} from "@/components/FormName";
import { useFormUpdate, usePathChange, useSaveData } from "@/utils/handle";
import { EmpList } from "@/components/NameList";
import { EmployeeHeader } from "@/components/Header";

export const getServerSideProps = (context) => getCompany(context);

const Employee = ({ company }) => {
  const router = useRouter();
  const querySel = router.query.sel;
  const branch = company;
  const emps = branch.companyEmployee;

  const selectedEmp = emps.find((item) => item.id === querySel);

  //オブジェクトから配列を除去
  const { ...initialData } = selectedEmp;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject } = useFormUpdate(initialData);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "備考" };
  const [activeTab, setActiveTab] = useState("tab1");

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = (e) => {
    saveData(e);
    //所属が変更の場合クエリを変更
    if (initialData.fk_companyBranchId === formData.fk_companyBranchId) {
      pathChange(formData.id, false);
    } else {
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
      <Navbar />
      <EmployeeHeader emps={emps} querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <EmpList emps={emps} querySel={querySel} />
          </div>

          <div className="col-8">
            <div className="my-3">
              <div className="h1">{branch.company.companyName}</div>
              <div className="h4">{branch.branchName}</div>
              <div className="h4">
                {selectedEmp.lastName} {selectedEmp.firstName}
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
                <div className="mb-2">
                  <FormSelect
                    title="所属"
                    formData={formData}
                    updateObject={updateObject}
                    branches={branch.company.companyBranch}
                  />
                </div>
                <div className="mb-2">
                  <BirthdateForm
                    formData={formData}
                    updateObject={updateObject}
                  />
                </div>
                <FullNameForm
                  title="氏名"
                  formData={formData}
                  updateObject={updateObject}
                />
                <div className="mb-2">
                  <NameFrom
                    title="役職"
                    nameKey="employmentStatus"
                    formData={formData}
                    updateObject={updateObject}
                  />
                  <NameFrom
                    title="部署"
                    nameKey="department"
                    formData={formData}
                    updateObject={updateObject}
                  />
                  <NameFrom
                    title="TEL"
                    nameKey="tel"
                    formData={formData}
                    updateObject={updateObject}
                  />
                  <NameFrom
                    title="Email"
                    nameKey="email"
                    formData={formData}
                    updateObject={updateObject}
                  />
                </div>

                <AddressForm formData={formData} updateObject={updateObject} />

                <hr />

                <button className="btn btn-info" onClick={handleSave}>
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
        </div>
      </div>
    </div>
  );
};

export default Employee;
