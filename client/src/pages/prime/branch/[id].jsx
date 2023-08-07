import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCompany } from "../../../utils/SSR";
import { AddressForm, NameFrom, NameFrom_kana } from "@/components/FormName";
import { BranchList } from "@/components/NameList";
import { useFormUpdate } from "@/utils/handle";

export const getServerSideProps = (context) => getCompany(context);

const branch = ({ company }) => {
  const router = useRouter();
  const querySel = parseInt(router.query.sel);
  const branches = company.companyBranch;

  const selectedBranch = branches.find((item) => item.id === querySel);
  const emps = selectedBranch.companyEmployee;

  //オブジェクトから配列を除去
  const { companyBranch, ...initialData } = selectedBranch;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject } = useFormUpdate(initialData);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <>
      <Navbar />

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default branch;
