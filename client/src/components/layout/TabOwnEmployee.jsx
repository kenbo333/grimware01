import { SelectStatus } from "../forms/SelectStatus";
import {
  SelectForm,
  FullNameForm,
  NameFrom,
  HalfFrom,
} from "../forms/InputForm";
import { BirthdateForm } from "../forms/InputBirthdateForm";
import { AddressForm } from "../forms/InputAddressForm";
import { ButtonEdit } from "../ui/ButtonEdit";
import InfoListLicense from "./InfoListLicense";
import InfoListRemark from "./InfoListRemark";
import NavTabs from "../forms/NavTabs";
import { useTabEmployee } from "../containers/useTabEmployee";
import InfoListPaidLeave from "./InfoListPaidLeave";

const tabs = ["詳細", "詳細2", "詳細3", "緊急", "資格", "有休", "備考"];

const TabOwnEmployee = (props) => {
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
          <div className="tab-pane active my-3">
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

        {/* 詳細2 */}
        {activeTab === "詳細2" && (
          <div className="tab-pane active my-3">
            <div className="row">
              <div className="col-6">
                <HalfFrom
                  title="入社日"
                  nameKey="entryDate"
                  type="date"
                  formUtils={formUtils}
                />
              </div>
              <div className="col-6">
                <div className="row">
                  <label
                    className="col-form-label col-sm-4"
                    htmlFor={"nameKey"}
                  >
                    勤続年数
                  </label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control"
                      id={"nameKey"}
                      disabled={true}
                      placeholder="自動入力"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <HalfFrom
                  title="経験年数"
                  nameKey="yearsOfExperience"
                  type="text"
                  formUtils={formUtils}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <HalfFrom
                  title="定健診日"
                  nameKey="routineCheckupDate"
                  type="date"
                  formUtils={formUtils}
                />
              </div>
              <div className="col-6">
                <HalfFrom
                  title="定病院名"
                  nameKey="routineCheckupHospital"
                  type="text"
                  formUtils={formUtils}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <HalfFrom
                  title="特健診日"
                  nameKey="specialCheckupDate"
                  type="date"
                  formUtils={formUtils}
                />
              </div>
              <div className="col-6">
                <HalfFrom
                  title="特病院名"
                  nameKey="specialCheckupHospital"
                  type="text"
                  formUtils={formUtils}
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <div className="row">
                  <label
                    className="col-sm-4 col-form-label"
                    htmlFor="bloodPressureUp"
                  >
                    血圧
                  </label>
                  <div className="col-sm-4 pe-0">
                    <input
                      type="text"
                      className="form-control"
                      id="bloodPressureUp"
                      value={formUtils.formData.bloodPressureUp}
                      onChange={handleChange}
                      disabled={!formUtils.formData.isEditing}
                    />
                  </div>
                  <div className="col-sm-4 ps-0">
                    <input
                      type="text"
                      className="form-control"
                      id="bloodPressureDown"
                      value={formUtils.formData.bloodPressureDown}
                      onChange={handleChange}
                      disabled={!formUtils.formData.isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-6">
                <HalfFrom
                  title="既往症"
                  nameKey="medicalHistory"
                  type="text"
                  formUtils={formUtils}
                />
              </div>
            </div>

            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* 詳細3 */}
        {activeTab === "詳細3" && (
          <div className="tab-pane active my-3">
            <div className="mb-2">
              <AddressForm formUtils={formUtils} />
            </div>
            <div className="mb-2">
              <NameFrom title="TEL" nameKey="homePhone" formUtils={formUtils} />
              <NameFrom
                title="phone"
                nameKey="persMobile"
                formUtils={formUtils}
              />
              <NameFrom
                title="Email"
                nameKey="persEmail"
                formUtils={formUtils}
              />
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <HalfFrom
                  title="日勤原価"
                  nameKey="laborCostDayShift"
                  formUtils={formUtils}
                  type="text"
                />
                <HalfFrom
                  title="深夜原価"
                  nameKey="laborCostNightShift"
                  formUtils={formUtils}
                  type="text"
                />
                <HalfFrom
                  title="残業原価"
                  nameKey="laborCostOvertime"
                  formUtils={formUtils}
                  type="text"
                />
                <HalfFrom
                  title="深夜残業原価"
                  nameKey="laborCostLateOvertime"
                  formUtils={formUtils}
                  type="text"
                />
              </div>
            </div>

            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* 緊急 */}
        {activeTab === "緊急" && (
          <div className="tab-pane active my-3">
            <div className="mb-2">
              <FullNameForm title="氏名" formUtils={formUtils} type="emg" />
            </div>
            <div className="mb-2">
              <NameFrom
                title="続柄"
                nameKey="emgRelation"
                formUtils={formUtils}
              />
            </div>
            <div className="mb-2">
              <NameFrom title="TEL" nameKey="emgPhone" formUtils={formUtils} />
            </div>

            <div className="mb-2">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="isEmgAddressSame"
                  disabled={!formUtils.formData.isEditing}
                  checked={formUtils.formData.isEmgAddressSame}
                  onClick={(e) => formUtils.updateCheckbox(e.target.id)}
                />
                <label className="form-check-label" htmlFor="isEmgAddressSame">
                  本人と同住所
                </label>
              </div>
            </div>
            {!formUtils.formData.isEmgAddressSame && (
              <div className="mb-2">
                <AddressForm title="氏名" formUtils={formUtils} type="emg" />
              </div>
            )}
            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* 資格 */}
        {activeTab === "資格" && <InfoListLicense sel={sel} />}

        {/* 有休 */}
        {activeTab === "有休" && <InfoListPaidLeave sel={sel} />}

        {/* 備考 */}
        {activeTab === "備考" && (
          <InfoListRemark fkName="fk_companyEmployeeId" sel={sel} />
        )}
      </div>
    </div>
  );
};

export default TabOwnEmployee;
