import React from "react";
import { useFetchSingle } from "@/components/containers/useFetchData";

const MonthlyReportSelectModal = (props) => {
  const { strDate, modalSelect, index, setModalIndex } = props;

  const {
    data: monthlyReports,
    error,
    isLoading,
  } = useFetchSingle(`/monthlyReports?strDate=${strDate}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">プロジェクト選択</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModalIndex(null)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="list-group">
              {monthlyReports.map((monthlyReport) => (
                <button
                  key={monthlyReport.id}
                  type="button"
                  className="list-group-item list-group-item-action"
                  name="fk_monthlyReportId"
                  data-index={index}
                  value={monthlyReport.id}
                  //表示用にdata-valueを追加
                  data-value={JSON.stringify({
                    project: {
                      name: monthlyReport.project.name,
                      distance: monthlyReport.project.distance,
                    },
                  })}
                  onClick={(e) => {
                    modalSelect(e, "monthlyReport");
                    setModalIndex(null);
                  }}
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
  );
};

export default MonthlyReportSelectModal;
