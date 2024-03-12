import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import React, { useState } from "react";
import { useFetchMulti } from "@/components/containers/useFetchData";
import MonthlyReportSelectModal from "../modal/MonthlyReportSelectModal";
import PaidLeaveSelectModal from "./PaidLeaveSelectModal";

const DailyReportA = (props) => {
  const { sel } = props;
  const [modalIndex, setModalIndex] = useState(null);

  const [modalIndexPaidLeave, setModalIndexPaidLeave] = useState(null);

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

  const urls = [
    "/companies?isSub=true&isStatus=true",
    "/option",
    "/cars?isStatus=true",
  ];
  const { data, error, isLoading } = useFetchMulti(urls);
  if (error) return <div>Failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  const [companies, option, cars] = data;

  // console.log(items);

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
          <div className="col-2">始業時間</div>
          <div className="col-2">就業時間</div>
          <div className="col-1 px-0">休憩</div>
          <div className="col-1 px-0">日勤</div>
          <div className="col-1 px-0">夜勤</div>
          <div className="col-1 px-0">残業</div>
          <div className="col-1 px-0">深夜</div>
          <div className="col-1 px-0">出張</div>
          <div className="col-1 px-0">夜食</div>
        </div>
        <div className="row h6 text-center">
          <div className="col-2">車両</div>
          <div className="col-2">運転</div>
          <div className="col-2">ETC代</div>
          <div className="col-2">距離</div>
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
                name="fk_monthlyReportId" // ダミー
                onClick={() => setModalIndex(index)}
                value={item.fk_monthlyReportId ?? ""}
                disabled={!item.isEditing}
                onChange={() => {}} // ダミー
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
            <div className="col-2 px-1">
              <input
                type="time"
                className="form-control form-control-sm"
                data-index={index}
                name="startTime"
                value={item.startTime ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 px-1">
              <input
                type="time"
                className="form-control form-control-sm"
                data-index={index}
                name="endTime"
                disabled={!item.isEditing}
                value={item.endTime ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="breakTime"
                disabled={!item.isEditing}
                value={item.breakTime ?? ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="day"
                value={item.day ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="night"
                value={item.night ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="overtime"
                value={item.overtime ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="lateOvertime"
                value={item.lateOvertime ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1 d-flex justify-content-center align-items-center">
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  className="form-check-input"
                  data-index={index}
                  name="isBusinessTrip"
                  checked={item.isBusinessTrip}
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
                  name="isNightMeal"
                  checked={item.isNightMeal}
                  disabled={!item.isEditing}
                  onChange={handleCheck}
                />
              </div>
            </div>
          </div>

          <div className="row mb-1">
            <div className="col-3 px-1">
              <select
                className="form-select form-select-sm"
                name="fk_carId"
                data-index={index.toString()}
                value={item.fk_carId ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-2 px-1">
              <select
                className="form-select form-select-sm"
                name="driving"
                data-index={index.toString()}
                value={item.driving ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="1">片道</option>
                <option value="2">往復</option>
              </select>
            </div>
            <div className="col-2 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="etcFees"
                value={item.etcFees ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 px-1">
              <input
                className="form-control form-control-sm"
                data-index={index}
                name="distance"
                value={item.distance ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* オプション選択 */}
          <div className="row mb-3">
            <div className="col-3 px-1">
              <select
                className="form-select form-select-sm"
                name="option1"
                data-index={index.toString()}
                value={item.option1 ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                {option.dailyReport1.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-3 px-1">
              <select
                className="form-select form-select-sm"
                name="option2"
                data-index={index.toString()}
                value={item.option2 ?? ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              >
                <option value=""></option>
                {option.dailyReport2.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
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
                name="fk_paidLeaveId" // ダミー
                onClick={() => setModalIndexPaidLeave(index)}
                value={item.fk_paidLeaveId ?? ""}
                disabled={!item.isEditing}
                onChange={() => {}} // ダミー
              >
                <option value={item.fk_paidLeaveId}>
                  {item.paidLeave?.grantDate}
                </option>
              </select>
              {modalIndexPaidLeave === index && (
                <PaidLeaveSelectModal
                  strDate={sel}
                  index={index}
                  setModalIndexPaidLeave={setModalIndexPaidLeave}
                  modalSelect={modalSelect}
                  fk_companyEmployeeId={item.fk_companyEmployeeId}
                />
              )}
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
  );
};

export default DailyReportA;
