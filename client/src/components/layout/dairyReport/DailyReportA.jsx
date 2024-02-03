import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import React from "react";
import { useFetchAll } from "@/components/containers/useFetchData";

const DailyReportA = (props) => {
  const { sel } = props;
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const isModalOpenState = { isModalOpen, setIsModalOpen };

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleCheck,
    lookupSelect,
  } = useInfoListItemLogic(sel, "DAILY_REPORT");

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
    "/companies?isPrime=true",
    `/monthlyReports?sel=${sel}`,
    "/option",
    "/cars",
  ];
  const { data, error, isLoading } = useFetchAll(urls);
  if (error) return <div>Failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  const [companies, monthlyReports, option, cars] = data;

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
                {getCompanyEmployeesOptions(item)}
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
                onChange={(e) => lookupSelect(e, "distance")}
              >
                <option value=""></option>
                {monthlyReports.map((m) => (
                  <option
                    key={m.id}
                    value={m.id}
                    data-value0={m.project.distance}
                  >
                    {m.project.name}
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
                data-index={index}
                name="breakTime"
                disabled={!item.isEditing}
                value={item.breakTime || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="day"
                value={item.day || ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="night"
                value={item.night || ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="overtime"
                value={item.overtime || ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-1 px-1">
              <input
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="lateOvertime"
                value={item.lateOvertime || ""}
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
                value={item.fk_carId || ""}
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
                value={item.driving || ""}
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
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="etcFees"
                value={item.etcFees || ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
            <div className="col-2 px-1">
              <input
                type="text"
                className="form-control form-control-sm"
                data-index={index}
                name="distance"
                value={item.distance || ""}
                disabled={!item.isEditing}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* オプション選択 */}
          <div className="row mb-1">
            <div className="col-3 px-1">
              <select
                className="form-select form-select-sm"
                name="option1"
                data-index={index.toString()}
                value={item.option1 || ""}
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
                value={item.option2 || ""}
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
