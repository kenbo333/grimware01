import { FullNameForm, NameFrom_kana } from "../forms/InputForm";
import { TransactionType } from "../forms/InputCheckboxForm";
import InfoListBranch from "./InfoListBranch";
import InfoListEmployee from "./InfoListEmployee";
import {
  useFormUpdate,
  usePathChange,
  useSaveData,
} from "@/components/containers/handleItem";
import apiClient from "../../../lib/apiClient";
import { useState } from "react";
import { SelectStatus } from "../forms/SelectStatus";
import { useRouter } from "next/router";
import { ButtonEdit } from "../ui/ButtonEdit";

const TabPrimeCompany = (props) => {
  const { companies } = props;
  const router = useRouter();
  const { sel } = router.query;
  const company = companies.find((item) => item.id === sel);
  const branches = company.companyBranch;
  const emps = company.companyEmployee;

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "店社", tab3: "社員" };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { companyBranch, companyEmployee, ...initialData } = company;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormUpdate(initialData);
  const { formData, endEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathChange();
  const handleSave = () => {
    const newFormData = endEdit();
    saveData(`/companies/${sel}`, newFormData);
    //元請会社のチェック||statusが不変
    const isStatic =
      company.isPrime === formData.isPrime &&
      company.isStatus === formData.isStatus;
    pathMove(isStatic, companies, sel);
  };

  //店社作成
  const handleCreate = async () => {
    try {
      const response = await apiClient.post(
        `/companies/${company.id}/branches`,
        {
          fk_companyId: sel,
        }
      );
      const { id: newBranchId } = response.data;
      router.push({
        pathname: `/primes/${company.id}`,
        query: { sel: newBranchId },
      });
      console.log(`create:${newBranchId}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h3">{company.companyName}</div>
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
            <form>
              <div className="mb-2">
                <NameFrom_kana
                  title="会社名"
                  nameKey="companyName"
                  formUtils={formUtils}
                />
              </div>
              <div className="mb-2">
                <FullNameForm title="代表者" formUtils={formUtils} />
              </div>
              <div>
                <TransactionType formUtils={formUtils} />
              </div>
              <hr />
              <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
            </form>
          </div>
        )}

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab2"
            role="tabpanel"
          >
            <InfoListBranch branches={branches} />

            <button
              type="button"
              className="btn btn-success"
              onClick={handleCreate}
            >
              新規登録
            </button>
          </div>
        )}

        {/* tab3 */}
        {activeTab === "tab3" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab3"
            role="tabpanel"
          >
            {emps.length ? (
              <InfoListEmployee emps={emps} />
            ) : (
              <div>登録されていません</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPrimeCompany;
