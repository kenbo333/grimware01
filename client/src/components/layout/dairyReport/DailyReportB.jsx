import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import { useFetchMulti } from "@/components/containers/useFetchData";
import InfoListButton from "@/components/ui/InfoListButton";
import React, { useState } from "react";
import MonthlyReportSelectModal from "../modal/MonthlyReportSelectModal";

const DailyReportB = (props) => {
  const { sel } = props;
  const [modalIndex, setModalIndex] = useState(null);

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleCheck,
    modalSelect,
  } = useInfoListItemLogic(sel, "DAILY_REPORT");

  // 氏名選択
  const getCompanyEmployeesOptions = ({ fk_companyId }) => {
    const company = companies.find((c) => c.id === fk_companyId);
    if (!company) return [];
    return company.companyEmployee.map((emp) => (
      <option key={emp.id} value={emp.id}>
        {`${emp.lastName} ${emp.firstName}`}
      </option>
    ));
  };

  // 有休選択
  const optionsPaidLeaves = ({ fk_companyEmployeeId }) => {
    const empPaidLeaves = paidLeaves.filter(
      (p) => p.fk_companyEmployeeId === fk_companyEmployeeId
    ); // 人物
    // .filter((p) => p.grantDay > p.dailyReport.length); // 有休が残っている
    empPaidLeaves.sort((a, b) => a.grantDate.localeCompare(b.grantDate));
    return empPaidLeaves.map((e) => (
      <option key={e.id} value={e.id}>
        {e.grantDate}
      </option>
    ));
  };

  const urls = [
    "/companies?isSub=true&isStatus=true",
    `/paidLeaves?expirationDate_gte=${sel}`,
  ];
  const { data, error, isLoading } = useFetchMulti(urls);
  if (error) return <div>Failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  const [companies, paidLeaves] = data;

  console.log(paidLeaves);

  return (
    <div className="tab-pane active my-3">
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        <div className="row h6 text-center">
          <div className="col-3">会社</div>
          <div className="col-3">氏名</div>
          <div className="col-4">プロジェクト名</div>
        </div>
        <div className="row h6 text-center">
          <div className="col-1 px-0">休日</div>
          <div className="col-1 px-0">有休</div>
          <div className="col-1 px-0">特別休</div>
          <div className="col-1 px-0">育児休</div>
          <div className="col-1 px-0">介護休</div>
        </div>
      </div>

      <hr />

      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row mb-1">
              <div className="col-3 px-1">
                <select
                  className="form-select form-select-sm"
                  name="fk_companyId"
                  data-index={index.toString()}
                  value={item.fk_companyId ?? ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                >
                  {!item.fk_companyId && <option value=""></option>}
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-3 px-1">
                <select
                  className="form-select form-select-sm"
                  name="fk_companyEmployeeId"
                  data-index={index.toString()}
                  value={item.fk_companyEmployeeId ?? ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {getCompanyEmployeesOptions(item)}
                </select>
              </div>

              <div className="col-4 px-1">
                <select
                  className="form-select form-select-sm"
                  id={item.id}
                  onClick={() => setModalIndex(index)}
                  value={item.fk_monthlyReportId ?? ""}
                  disabled={!item.isEditing}
                  onChange={() => {}} //ダミー
                >
                  <option value={item.fk_monthlyReportId ?? ""}>
                    {item.monthlyReport?.project.name}
                  </option>
                </select>
                {modalIndex === index && (
                  <MonthlyReportSelectModal
                    strDate={sel}
                    index={index}
                    setModalIndex={setModalIndex}
                    modalSelect={modalSelect}
                  />
                )}
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-1 px-1 d-flex justify-content-center align-items-center">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    data-index={index}
                    name="isDayOff"
                    checked={item.isDayOff}
                    disabled={!item.isEditing}
                    onChange={handleCheck}
                  />
                </div>
              </div>

              <div className="col-4 px-1">
                <select
                  className="form-select form-select-sm"
                  name="fk_paidLeaveId"
                  data-index={index.toString()}
                  value={item.fk_paidLeaveId ?? ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {optionsPaidLeaves(item)}
                </select>
              </div>

              <div className="col-1 px-1 d-flex justify-content-center align-items-center">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    data-index={index}
                    name="isSpecialLeave"
                    checked={item.isSpecialLeave}
                    disabled={!item.isEditing}
                    onChange={handleCheck}
                  />
                </div>
              </div>
              <div className="col-1 px-1 d-flex justify-content-center align-items-center">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    data-index={index}
                    name="isParentalLeave"
                    checked={item.isParentalLeave}
                    disabled={!item.isEditing}
                    onChange={handleCheck}
                  />
                </div>
              </div>
              <div className="col-1 px-1 d-flex justify-content-center align-items-center">
                <div className="form-check form-switch">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    data-index={index}
                    name="isCaregivingLeave"
                    checked={item.isCaregivingLeave}
                    disabled={!item.isEditing}
                    onChange={handleCheck}
                  />
                </div>
              </div>
            </div>

            <InfoListButton
              isEditing={item.isEditing}
              onEdit={() => handleEdit(index)}
              onSave={() => handleSave(index)}
              onCancel={() => handleCancel(index)}
              onDelete={() => handleDelete(index)}
            />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyReportB;
