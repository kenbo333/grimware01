import { NameFrom, NameFrom_kana } from "../forms/InputForm";
import { SelectStatus } from "../forms/SelectStatus";
import { AddressForm } from "../forms/InputAddressForm";
import { ButtonEdit } from "../ui/ButtonEdit";
import InfoListBranchPermitNotice from "./InfoListBranchPermitNotice";
import { InfoListEmployee } from "./InfoListEmployee";
import NavTabs from "../forms/NavTabs";
import { useTabBranch } from "../containers/useTabBranch";

const tabs = ["詳細", "社員", "支払", "許可/届出"];

const TabSubBranch = (props) => {
  const { branches, company, isCreateState } = props;
  const {
    activeTab,
    setActiveTab,
    branch,
    emps,
    formUtils,
    handleSave,
    handleCreate,
    companyId,
    sel,
  } = useTabBranch("subs", branches, isCreateState);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h1">{company.name}</div>
          <div className="h4">{branch.name}</div>
        </div>
        <div>
          <SelectStatus formUtils={formUtils} />
        </div>
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && (
          <div className="tab-pane fade show active my-3" id="詳細">
            <div className="mb-2">
              <NameFrom_kana
                title="店社名"
                nameKey="name"
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

        {/* 社員 */}
        {activeTab === "社員" && (
          <div className="tab-pane fade show active my-3" id="社員">
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

        {/* 支払 */}
        {activeTab === "支払" && (
          <div className="tab-pane fade show active my-3" id="支払"></div>
        )}

        {/* 許可/届出 */}
        {activeTab === "許可/届出" && (
          <div className="tab-pane fade show active my-3" id="許可/届出">
            <InfoListBranchPermitNotice sel={sel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabSubBranch;
