import React, { useEffect, useState } from "react";
import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import {
  NameFrom,
  NameFrom_kana,
  SelectForm,
  StartEndForm,
} from "../../forms/InputForm";
import { useRouter } from "next/router";
import { ButtonEdit } from "../../ui/ButtonEdit";
import NavTabs from "../../forms/NavTabs";
import { AddressForm } from "../../forms/InputAddressForm";
import apiClient from "../../../../lib/apiClient";
import InfoListRemark from "../InfoListRemark";
import ProjectModalCompany from "./ProjectModalCompany";

const tabs = ["詳細", "商流", "勘定", "ファイル", "仕入"];

const TabProject = (props) => {
  const { projects, isCreateState } = props;
  const router = useRouter();
  const { sel } = router.query;
  const project = projects.find((item) => item.id === sel);

  //オブジェクトから配列を除去
  const { ...initialData } = project;

  const [activeTab, setActiveTab] = useState("商流");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  const [ownCompany, setOwnCompany] = useState([]);
  const branches = ownCompany.companyBranch;
  const emps = ownCompany.companyEmployee?.filter(
    (emp) => emp.fk_companyBranchId === formData.fk_companyBranchId_own
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpenState = { isModalOpen, setIsModalOpen };

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = () => {
    try {
      const newFormData = endEdit();
      saveData(`/projects/${sel}`, newFormData);
      // const isStatic = car.isStatus === formData.isStatus;
      pathMove(true, projects, sel);
    } catch (error) {
      console.error(error);
    }
  };

  //編集モード
  useEffect(() => {
    isCreateState.isCreate && (startEdit(), isCreateState.setIsCreate(false));
  }, [isCreateState.isCreate]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.get("/companies?isOwn=true");
        setOwnCompany(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, []);

  return (
    <div>
      <div className="h6">{project.id}</div>
      <div className="h3">{project.projectId}</div>
      <div className="d-flex justify-content-between my-3">
        <div className="h3">{project.name}</div>
        <div>{/* <SelectStatus formUtils={formUtils} /> */}</div>
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && (
          <div className="tab-pane fade show active my-3" id="詳細">
            <div className="mb-2">
              <NameFrom_kana
                title="名称"
                nameKey="name"
                formUtils={formUtils}
              />
            </div>
            <div className="mb-2">
              <NameFrom
                title="略称"
                nameKey="shortName"
                formUtils={formUtils}
              />
            </div>
            <div className="mb-2">
              <NameFrom
                title="客先番号"
                nameKey="clientNumber"
                formUtils={formUtils}
              />
            </div>
            <div className="mb-2">
              <NameFrom title="ｶﾗｰｺｰﾄﾞ" nameKey="color" formUtils={formUtils} />
            </div>
            <div className="mb-2">
              <StartEndForm
                title="全体工期"
                startKey="projectStartDate"
                endKey="projectEndDate"
                formUtils={formUtils}
              />
              <StartEndForm
                title="自社工期"
                startKey="ownProjectStartDate"
                endKey="ownProjectEndDate"
                formUtils={formUtils}
              />
            </div>
            <div className="mb-2">
              <NameFrom title="TEL" nameKey="tel" formUtils={formUtils} />
            </div>
            <div className="mb-2">
              <AddressForm formUtils={formUtils} />
            </div>
            <div className="mb-2">
              <NameFrom title="距離" nameKey="distance" formUtils={formUtils} />
            </div>
          </div>
        )}

        {/* 商流 */}
        {activeTab === "商流" && (
          <div className="tab-pane fade show active my-3" id="商流">
            <div className="mb-2">
              <SelectForm
                title="担当"
                items={branches}
                nameKey="fk_companyBranchId_own"
                viewFn={(item) => item.name}
                isAllowEmpty={true}
                formUtils={formUtils}
              />
              <div className="row">
                <div className="col-10">
                  <div className="row">
                    <label
                      className="col-form-label col-sm-3"
                      htmlFor="isDedicate"
                    >
                      主任技術者
                    </label>
                    <div className="col-sm-9">
                      <select
                        className="form-select"
                        id="fk_companyEmployeeId_chief"
                        onChange={(e) =>
                          formUtils.updateObject(e.target.id, e.target.value)
                        }
                        value={formData["fk_companyEmployeeId_chief"]}
                        disabled={!formData.isEditing}
                      >
                        <option value=""></option>
                        {emps?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {`${item.lastName} ${item.firstName}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="isDedicate"
                      checked={formData.isDedicate || false}
                      onChange={(e) => formUtils.updateCheckbox(e.target.id)}
                      disabled={!formData.isEditing}
                    />
                    <label className="form-check-label" htmlFor="isDedicate">
                      専任
                    </label>
                  </div>
                </div>
              </div>
              <SelectForm
                title="安全衛生"
                items={emps}
                nameKey="fk_companyEmployeeId_safety"
                viewFn={(item) => `${item.lastName} ${item.firstName}`}
                isAllowEmpty={true}
                formUtils={formUtils}
              />
              <SelectForm
                title="職長"
                items={emps}
                nameKey="fk_companyEmployeeId_foreman"
                viewFn={(item) => `${item.lastName} ${item.firstName}`}
                isAllowEmpty={true}
                formUtils={formUtils}
              />
            </div>

            <div className="mb-2">
              <div className="row">
                <label
                  className="col-form-label col-sm-2"
                  htmlFor="fk_companyId_prime"
                >
                  元請会社
                </label>
                <div className="col-sm">
                  <select
                    className="form-select"
                    id="fk_companyId_prime"
                    onChange={(e) =>
                      formUtils.updateObject(e.target.id, e.target.value)
                    }
                    value={formData["fk_companyId_prime"]}
                    disabled
                  >
                    <option value={formData.fk_companyId_prime}>
                      {formData.fk_companyId_prime}
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <label
                  className="col-form-label col-sm-2"
                  htmlFor="fk_companyId_prime"
                >
                  元請店
                </label>
                <div className="col-sm">
                  <select
                    className="form-select"
                    id="fk_companyBranchId_prime"
                    onChange={(e) =>
                      formUtils.updateObject(e.target.id, e.target.value)
                    }
                    value={formData["fk_companyBranchId_prime"]}
                    disabled
                  >
                    <option value={formData.fk_companyBranchId_prime}>
                      {formData.fk_companyBranchId_prime}
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                <label
                  className="col-form-label col-sm-2"
                  htmlFor="fk_companyEmployeeId_prime"
                >
                  担当
                </label>
                <div className="col-sm">
                  <select
                    className="form-select"
                    id="fk_companyEmployeeId_prime"
                    onChange={(e) =>
                      formUtils.updateObject(e.target.id, e.target.value)
                    }
                    value={formData["fk_companyEmployeeId_prime"]}
                    disabled
                  >
                    <option value={formData.fk_companyEmployeeId_prime}>
                      {formData.fk_companyEmployeeId_prime}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col-6">
                <span>取引する仕入会社</span>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setIsModalOpen(true)}
                >
                  編集
                </button>
                {isModalOpen && (
                  <ProjectModalCompany
                    isModalOpenState={isModalOpenState}
                    sel={sel}
                  />
                )}
              </div>
              <div className="col-6"></div>
            </div>
          </div>
        )}

        {/* 勘定 */}
        {activeTab === "勘定" && (
          <div className="tab-pane fade show active my-3" id="勘定">
            勘定
          </div>
        )}

        {/* ファイル */}
        {activeTab === "ファイル" && (
          <div className="tab-pane fade show active my-3" id="ファイル">
            <InfoListRemark fkName="fk_project" sel={sel} />
          </div>
        )}

        {/* 仕入 */}
        {activeTab === "仕入" && (
          <div className="tab-pane fade show active my-3" id="仕入">
            仕入
          </div>
        )}

        <hr />

        {["詳細", "商流", "勘定"].includes(activeTab) && (
          <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default TabProject;
