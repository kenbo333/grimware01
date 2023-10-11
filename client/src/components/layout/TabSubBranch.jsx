import { useState } from "react";
import { NameFrom, NameFrom_kana } from "../forms/InputForm";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import apiClient from "../../../lib/apiClient";
import { SelectStatus } from "../forms/SelectStatus";
import { AddressForm } from "../forms/InputAddressForm";
import { ButtonEdit } from "../ui/ButtonEdit";
import InfoListBranchPermitNotice from "./InfoListBranchPermitNotice";
import { InfoListEmployee } from "./InfoListEmployee";

const TabSubBranch = (props) => {
  const { branches, company } = props;
  const router = useRouter();
  const { sel, companyId } = router.query;
  const branch = branches.find((item) => item.id === sel);
  const emps = branch.companyEmployee;

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "社員", tab3: "支払", tab4: "許可/届出" };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { companyEmployee, ...initialData } = branch;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = () => {
    const newFormData = endEdit();
    saveData(`/companies/${companyId}/branches/${sel}`, newFormData);
    //statusが不変
    const isStatic = branch.isStatus === formData.isStatus;
    pathMove(isStatic, branches, sel);
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
        pathname: `/subs/${companyId}/branches/${branch.id}`,
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
          <div className="h1">{company.companyName}</div>
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
          <div className="tab-pane fade show active my-3" id="tab1">
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
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div className="tab-pane fade show active my-3" id="tab2">
            <InfoListEmployee
              emps={emps}
              link={`/subs/${companyId}/branches/${branch.id}?sel=`}
            />

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
          <div className="tab-pane fade show active my-3" id="tab3"></div>
        )}

        {/* tab4 */}
        {activeTab === "tab4" && (
          <div className="tab-pane fade show active my-3" id="tab4">
            <InfoListBranchPermitNotice sel={sel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSubBranch;
