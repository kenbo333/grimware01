import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import React from "react";
import { useFetchAll } from "@/components/containers/useFetchData";

const DailyReportC = (props) => {
  const { sel } = props;

  const {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
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

  const formatCost = (cost) => (cost ? `${cost.toLocaleString()} 円` : "-");

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
        <div className="row h6 text-center">
          <div className="col-3">会社</div>
          <div className="col-3">氏名</div>
          <div className="col-4">プロジェクト名</div>
        </div>
        <div className="row h6 text-center">
          <div className="col-3">燃料代</div>
          <div className="col-3">労務原価</div>
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
          </div>

          <div className="row mb-2">
            <div className="col-3">{formatCost(item.calcFuelCost)}</div>
            <div className="col-3">{formatCost(item.calcLaborCost)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyReportC;
