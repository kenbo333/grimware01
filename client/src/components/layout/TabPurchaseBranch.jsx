import { NameFrom, NameForm_kana } from "../forms/InputForm";
import { SelectStatus } from "../forms/SelectStatus";
import { AddressForm } from "../forms/InputAddressForm";
import { ButtonEdit } from "../ui/ButtonEdit";
import { InfoListEmployee } from "./InfoListEmployee";
import NavTabs from "../forms/NavTabs";
import { useTabBranch } from "../containers/useTabBranch";

const tabs = ["詳細", "担当者", "仕入"];

const TabPurchaseBranch = (props) => {
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
  } = useTabBranch("primes", branches, isCreateState);

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
          <div className="tab-pane active my-3">
            <div className="mb-2">
              <NameForm_kana
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

        {/* 担当者 */}
        {activeTab === "担当者" && (
          <div>
            <InfoListEmployee
              emps={emps}
              link={`/purchases/${companyId}/branches/${branch.id}/employees?sel=`}
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

        {/* 仕入 */}
        {activeTab === "仕入" && <div className="tab-pane my-3"></div>}
      </div>
    </div>
  );
};

export default TabPurchaseBranch;
