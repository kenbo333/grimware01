import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";
import MonthlyReportSelect from "./MonthlyReportSelect";

const DailyReportA = (props) => {
  const { sel } = props;
  const [companies, setCompanies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isModalOpenState = { isModalOpen, setIsModalOpen };
  const [monthlyReports, setMonthlyReports] = useState([]);

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleClick,
  } = useInfoListItemLogic(sel, "DAILY_REPORT");

  const getCompanyEmployees = (companyId) => {
    const company = companies.find((c) => c.id === companyId);
    return company ? company.companyEmployee : [];
  };

  // 会社データ取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/companies?isPrime=true");
        setCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 月報データ取得(select用)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/monthlyReports?sel=${sel}`);
        setMonthlyReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

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
                  value={item.fk_companyId || ""}
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
                  value={item.fk_companyEmployeeId || ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {getCompanyEmployees(item.fk_companyId).map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.lastName + emp.firstName}
                    </option>
                  ))}
                </select>
              </div>

              {/* プロジェクト選択 */}
              <div className="col-4 px-1">
                <select
                  className="form-select form-select-sm"
                  name="fk_monthlyReportId"
                  data-index={index.toString()}
                  value={item.fk_monthlyReportId || ""}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                >
                  {!item.fk_monthlyReportId && <option value=""></option>}
                  {monthlyReports.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.project.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* <div className="col-4 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={item.fk_monthlyReport || ""}
                  onClick={() => setIsModalOpen(true)}
                  readOnly
                />
              </div> */}
              {/* {isModalOpen && (
                <MonthlyReportSelect
                  isModalOpenState={isModalOpenState}
                  sel={sel}
                  item={item}
                  handleClick={handleClick}
                />
              )} */}
            </div>

            <div className="row mb-1">
              <div className="col-2 px-1">
                <input
                  type="time"
                  className="form-control form-control-sm"
                  data-index={index}
                  name="startTime"
                  value={item.startTime || ""}
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
                  value={item.endTime || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.breakTime || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.day || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.night || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.overtime || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.lateOvertime || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.businessTripAllowance || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-1 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.nightMealAllowance || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row mb-1">
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.fk_carId || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.drivingAllowance || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.etcFees || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="col-2 px-1">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  disabled={!item.isEditing}
                  value={item.distance || ""}
                  onChange={handleChange}
                />
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

export default DailyReportA;
