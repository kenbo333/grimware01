import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import React, { useState } from "react";
import { useFetchMulti } from "@/components/containers/useFetchData";
import MonthlyReportSelect from "../modal/MonthlyReportSelect";

const DailyReportC = (props) => {
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

  const urls = ["/companies?isSub=true&isStatus=true"];
  const { data, error, isLoading } = useFetchMulti(urls);
  if (error) return <div>Failed to load data.</div>;
  if (isLoading) return <div>Loading...</div>;
  const [companies] = data;

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
                <MonthlyReportSelect
                  strDate={sel}
                  index={index}
                  setModalIndex={setModalIndex}
                  modalSelect={modalSelect}
                />
              )}
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
