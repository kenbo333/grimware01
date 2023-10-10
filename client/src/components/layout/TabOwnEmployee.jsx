import React, { useState } from "react";
import { SelectStatus } from "../forms/SelectStatus";
import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import {
  SelectForm,
  FullNameForm,
  NameFrom,
  HalfFrom,
} from "../forms/InputForm";
import { BirthdateForm } from "../forms/InputBirthdateForm";
import { AddressForm } from "../forms/InputAddressForm";
import { useRouter } from "next/router";
import { ButtonEdit } from "../ui/ButtonEdit";
import InfoListLicense from "./InfoListLicense";
import InfoListRemark from "./InfoListRemark";

const TabOwnEmployee = (props) => {
  const { branch, emps } = props;
  const router = useRouter();
  const { sel, companyId, branchId } = router.query;
  const emp = emps.find((item) => item.id === sel);

  //タブ設定
  const tabs = {
    tab1: "詳細1",
    tab2: "詳細2",
    tab3: "詳細3",
    tab4: "緊急",
    tab5: "資格",
    tab6: "有給",
    tab7: "備考",
  };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { ...initialData } = emp;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = () => {
    const newFormData = endEdit();
    saveData(
      `/companies/${companyId}/branches/${branchId}/employees/${sel}`,
      newFormData
    );
    //所属とstatusが不変時
    const isStatic =
      emp.fk_companyBranchId === formData.fk_companyBranchId &&
      emp.isStatus === formData.isStatus;
    pathMove(isStatic, emps, sel);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    formUtils.updateObject(id, value);
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>
          <div className="h1">{branch.company.companyName}</div>
          <div className="h4">{branch.branchName}</div>
          <div className="h4">
            {emp.lastName} {emp.firstName}
          </div>
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

      <div className="tab-content">
        {/* tab1 */}
        {activeTab === "tab1" && (
          <div className="tab-pane fade show active my-3" id="tab1">
            <div className="mb-2">
              <SelectForm
                title="所属"
                items={branch.company.companyBranch}
                nameKey="fk_companyBranchId"
                viewKey="branchName"
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

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div className="tab-pane fade show active my-3" id="tab2">
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
                      value={formData.bloodPressureUp}
                      onChange={handleChange}
                      disabled={!formData.isEditing}
                    />
                  </div>
                  <div className="col-sm-4 ps-0">
                    <input
                      type="text"
                      className="form-control"
                      id="bloodPressureDown"
                      value={formData.bloodPressureDown}
                      onChange={handleChange}
                      disabled={!formData.isEditing}
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

        {/* tab3 */}
        {activeTab === "tab3" && (
          <div className="tab-pane fade show active my-3" id="tab3">
            <div className="mb-2">
              <AddressForm formUtils={formUtils} />
            </div>
            <div>
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

            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* tab4 */}
        {activeTab === "tab4" && (
          <div className="tab-pane fade show active my-3" id="tab4">
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
                  disabled={!formData.isEditing}
                  checked={formData.isEmgAddressSame}
                  onClick={(e) => formUtils.updateCheckbox(e.target.id)}
                />
                <label className="form-check-label" htmlFor="isEmgAddressSame">
                  本人と同住所
                </label>
              </div>
            </div>
            {!formData.isEmgAddressSame && (
              <div className="mb-2">
                <AddressForm title="氏名" formUtils={formUtils} type="emg" />
              </div>
            )}
            <hr />
            <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
          </div>
        )}

        {/* tab5 */}
        {activeTab === "tab5" && (
          <div className="tab-pane fade show active my-3" id="tab5">
            <InfoListLicense sel={sel} />
          </div>
        )}

        {/* tab6 */}
        {activeTab === "tab6" && (
          <div className="tab-pane fade show active my-3" id="tab6"></div>
        )}

        {/* tab7 */}
        {activeTab === "tab7" && (
          <div className="tab-pane fade show active my-3" id="tab7">
            <InfoListRemark fkName="fk_companyEmployee" sel={sel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabOwnEmployee;
