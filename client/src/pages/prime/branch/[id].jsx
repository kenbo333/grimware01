import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCompany } from "../../../utils/SSR";
import { AddressForm, NameFrom, NameFrom_kana } from "@/components/FormName";
import { BranchList } from "@/components/NameList";
import { useFormUpdate, usePathChange, useSaveData } from "@/utils/handle";
import { BranchHeader } from "@/components/Header";
import apiClient from "../../../../lib/apiClient";

export const getServerSideProps = (context) => getCompany(context);

const Branch = ({ company }) => {
  const router = useRouter();
  const querySel = router.query.sel;
  const branches = company.companyBranch;

  const selectedBranch = branches.find((item) => item.id === querySel);
  const emps = selectedBranch.companyEmployee;

  //オブジェクトから配列を除去
  const { companyEmployee, ...initialData } = selectedBranch;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject } = useFormUpdate(initialData);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = (e) => {
    saveData(e);
    pathChange(formData.id, false);
  };

  //社員作成
  const handleCreateBranch = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/prime/branch/employee", {
        fk_companyId: company.id,
        fk_companyBranchId: selectedBranch.id,
      });
      const { id } = response.data;
      router.push({
        pathname: `/prime/branch/employee/${selectedBranch.id}`,
        query: { sel: id },
      });
      console.log(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <BranchHeader branches={branches} querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <BranchList branches={branches} querySel={querySel} />
          </div>

          <div className="col-8">
            <div className="my-3">
              <div className="h1">{company.companyName}</div>
              <div className="h4">{selectedBranch.branchName}</div>
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
                <NameFrom_kana
                  title={"店社名"}
                  nameKey={"branchName"}
                  formData={formData}
                  updateObject={updateObject}
                />

                <div className="my-2">
                  <AddressForm
                    formData={formData}
                    updateObject={updateObject}
                  />
                </div>

                <NameFrom
                  title="TEL"
                  nameKey="tel"
                  formData={formData}
                  updateObject={updateObject}
                />
                <NameFrom
                  title="FAX"
                  nameKey="fax"
                  formData={formData}
                  updateObject={updateObject}
                />
                <NameFrom
                  title="Email"
                  nameKey="email"
                  formData={formData}
                  updateObject={updateObject}
                />
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
                <div>
                  <div className="row h6">
                    <div className="col-4">氏名/Email</div>
                    <div className="col-8">TEL</div>
                  </div>

                  <hr />

                  {emps.map((emp) => (
                    <div key={emp.id}>
                      <div className="row">
                        <div className="col-4">
                          {emp.lastName} {emp.firstName}
                        </div>
                        <div className="col-8">{emp.tel}</div>
                        <div className="row">
                          <div className="col">{emp.email}</div>
                        </div>
                      </div>
                      <Link
                        href={`employee/${emp.fk_companyBranchId}?sel=${emp.id}`}
                      >
                        社員リンク
                      </Link>
                      <hr />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={handleCreateBranch}
                  >
                    新規登録
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branch;
