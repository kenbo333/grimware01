import useInfoListItemLogic from "@/components/containers/infoListItemLogic";
import InfoListButton from "@/components/ui/InfoListButton";
import React, { useEffect, useState } from "react";
import { apiClient } from "../../../../lib/apiClient";
import MonthlyReportSelect from "./MonthlyReportSelect";

const DailyReportC = (props) => {
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
          <div className="col-2 px-0">燃料代</div>
          <div className="col-2 px-0">原価移動費</div>
          <div className="col-2 px-0">請求移動費</div>
          <div className="col-2 px-0">原価労務費</div>
          <div className="col-2 px-0">請求労務費</div>
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
                  name="fk_monthlyReport"
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

              <div className="row mb-1">
                <div className="col-2 px-1"></div>
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

export default DailyReportC;
