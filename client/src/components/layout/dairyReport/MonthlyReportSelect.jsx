import React, { useEffect, useState } from "react";
import { apiClient } from "../../../../lib/apiClient";

const MonthlyReportSelect = (props) => {
  const { isModalOpenState, sel, item, handleClick } = props;
  const { isModalOpen, setIsModalOpen } = isModalOpenState;
  const [monthlyReports, setMonthlyReports] = useState([]);

  // const handleClick = (monthlyReport) => {
  //   // console.log(monthlyReport);
  //   const newItem = { ...item, fk_monthlyReport: monthlyReport.id };
  //   console.log(newItem);
  // };

  // console.log(item);

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
    <div>
      <div
        className={`modal ${isModalOpen ? "d-block show" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">プロジェクト作成</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>

            <div className="modal-body">
              <div className="list-group">
                {monthlyReports.map((monthlyReport) => (
                  <button
                    key={monthlyReport.id}
                    type="button"
                    className="list-group-item list-group-item-action"
                    onClick={() => handleClick(item, monthlyReport)}
                  >
                    {monthlyReport.project.name} {monthlyReport.closingDate}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-footer justify-content-center"></div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={`modal-backdrop ${isModalOpen ? "show" : ""}`}></div>
      )}
    </div>
  );
};

export default MonthlyReportSelect;
