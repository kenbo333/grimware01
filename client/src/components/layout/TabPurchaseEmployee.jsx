import { SelectStatus } from "../forms/SelectStatus";
import { SelectForm, FullNameForm, NameFrom } from "../forms/InputForm";
import { BirthdateForm } from "../forms/InputBirthdateForm";
import { ButtonEdit } from "../ui/ButtonEdit";
import InfoListRemark from "./InfoListRemark";
import NavTabs from "../forms/NavTabs";
import { useTabEmployee } from "../containers/useTabEmployee";

const tabs = ["詳細", "備考"];

const TabPurchaseEmployee = (props) => {
  const { branch, emps, isCreateState } = props;
  const {
    activeTab,
    setActiveTab,
    emp,
    formUtils,
    handleSave,
    handleChange,
    sel,
  } = useTabEmployee(emps, isCreateState);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h1">{branch.company.name}</div>
          <div className="h4">{branch.name}</div>
          <div className="h4">
            {emp.lastName} {emp.firstName}
          </div>
        </div>
        <div>
          <SelectStatus formUtils={formUtils} />
        </div>
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && (
          <div className="tab-pane fade show active my-3" id="詳細">
            <div className="mb-2">
              <SelectForm
                title="所属"
                items={branch.company.companyBranch}
                nameKey="fk_companyBranchId"
                viewFn={(item) => item.name}
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
              <NameFrom
                title="部署"
                nameKey="department"
                formUtils={formUtils}
              />
              <NameFrom
                title="TEL"
                nameKey="compMobile"
                formUtils={formUtils}
              />
              <NameFrom
                title="Email"
                nameKey="compEmail"
                formUtils={formUtils}
              />
            </div>

            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* 備考 */}
        {activeTab === "備考" && (
          <div className="tab-pane fade show active my-3" id="備考">
            <InfoListRemark fkName="fk_companyEmployeeId" sel={sel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabPurchaseEmployee;
