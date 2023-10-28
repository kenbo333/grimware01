import { FullNameForm, NameFrom_kana } from "../forms/InputForm";
import { TransactionType } from "../forms/InputCheckboxForm";
import InfoListBranch from "./InfoListBranch";
import { InfoListEmployeeBranch } from "./InfoListEmployee";
import { SelectStatus } from "../forms/SelectStatus";
import { ButtonEdit } from "../ui/ButtonEdit";
import { useTabCompany } from "../containers/useTabCompany";
import NavTabs from "../forms/NavTabs";

const tabs = ["詳細", "店社", "社員"];

const TabPrimeCompany = (props) => {
  const { companies, isCreateState } = props;
  const {
    company,
    formUtils,
    handleSave,
    handleCreate,
    activeTab,
    setActiveTab,
    branches,
    emps,
  } = useTabCompany(companies, isCreateState, "prime");

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h3">{company.name}</div>
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
            <form>
              <div className="mb-2">
                <NameFrom_kana
                  title="会社名"
                  nameKey="name"
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
        {activeTab === "店社" && (
          <div className="tab-pane fade show active my-3" id="店社">
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
        {activeTab === "社員" && (
          <div className="tab-pane fade show active my-3" id="社員">
            {emps.length ? (
              <InfoListEmployeeBranch emps={emps} />
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
