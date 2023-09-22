import { useState } from "react";
import { NameFrom, NameFrom_kana } from "../forms/InputForm";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useFormUpdate,
  usePathChange,
  useSaveData,
} from "@/components/containers/handleItem";
import apiClient from "../../../lib/apiClient";
import { SelectStatus } from "../forms/SelectStatus";
import { AddressForm } from "../forms/InputAddressForm";

const TabPrimeBranch = (props) => {
  const { branches, company } = props;
  const router = useRouter();
  const { sel, companyId } = router.query;
  const branch = branches.find((item) => item.id === sel);
  const emps = branch.companyEmployee;

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { companyEmployee, ...initialData } = branch;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormUpdate(initialData);
  const { formData } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = () => {
    saveData(`/companies/${companyId}/branches/${sel}`);
    //statusが不変時
    if (branch.isStatus === formData.isStatus) {
      //再レンダリング
      pathChange(formData.id, false);
    } else {
      //変更時、selを上に移動
      const index = branches.findIndex((item) => item.id === sel);
      if (index) {
        pathChange(branches[index - 1].id, false);
      } else {
        pathChange("", false);
      }
    }
  };

  //社員作成
  const handleCreate = async () => {
    try {
      const response = await apiClient.post(
        `/companies/${companyId}/branches/${sel}/employees`,
        {
          fk_companyId: branch.fk_companyId,
          fk_companyBranchId: branch.id,
        }
      );
      const { id: newEmployeeId } = response.data;
      router.push({
        pathname: `/primes/${companyId}/branches/${branch.id}`,
        query: { sel: newEmployeeId },
      });
      console.log(`create:${newEmployeeId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h1">{companyEmployee.companyName}</div>
          <div className="h4">{branch.branchName}</div>
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

      {/* tab */}
      <div className="tab-content">
        {/* tab1 */}
        {activeTab === "tab1" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab1"
            role="tabpanel"
          >
            <div className="mb-2">
              <NameFrom_kana
                title="店社名"
                nameKey="branchName"
                formUtils={formUtils}
              />
            </div>

            <div className="mb-2">
              <AddressForm formUtils={formUtils} />
            </div>

            <div>
              <NameFrom title="TEL" nameKey="tel" formUtils={formUtils} />
              <NameFrom title="FAX" nameKey="fax" formUtils={formUtils} />
              <NameFrom title="Email" nameKey="email" formUtils={formUtils} />
            </div>
            <hr />
            <button type="button" className="btn btn-info" onClick={handleSave}>
              保存
            </button>
          </div>
        )}

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div
            className="tab-pane fade show active my-3"
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
                    href={`/primes/${companyId}/branches/${branch.id}?sel=${emp.id}`}
                  >
                    社員リンク
                  </Link>
                  <hr />
                </div>
              ))}

              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreate}
              >
                新規登録
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPrimeBranch;
