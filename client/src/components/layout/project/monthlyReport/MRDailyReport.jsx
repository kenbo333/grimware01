import { useFetchSingle } from "@/components/containers/useFetchData";
import { formatAsYen } from "@/utils/formatting";
import React from "react";

const MRDailyReport = (props) => {
  const { sel } = props;
  const {
    data: dailyReports,
    error,
    isLoading,
  } = useFetchSingle(`/dailyReports?fk_monthlyReportId=${sel}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(dailyReports);

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3">人工数</div>
        <div className="col-3">原価労務費</div>
        <div className="col-3">燃料ETC</div>
      </div>
      <div className="row">
        <div className="col-3"></div>
        <div className="col-3 h5">{dailyReports.length}</div>
        <div className="col-3 h5">
          {formatAsYen(
            dailyReports.reduce(
              (acc, { calcLaborCost }) => acc + calcLaborCost,
              0
            )
          )}
        </div>
        <div className="col-3 h5">
          {formatAsYen(
            dailyReports.reduce(
              (acc, { calcFuelCost, etcFees }) => acc + calcFuelCost + etcFees,
              0
            )
          )}
        </div>
      </div>

      <hr className="my-1" />

      {dailyReports.map((dailyReport) => (
        <div key={dailyReport.id} className="row">
          <div className="col-3 small">{dailyReport.fk_dailyId}</div>
          <div className="col-3 small">{`${dailyReport.companyEmployee.lastName} ${dailyReport.companyEmployee.firstName}`}</div>
          <div className="col-3 small">
            {formatAsYen(dailyReport.calcLaborCost)}
          </div>
          <div className="col-3 small">
            {formatAsYen(dailyReport.calcFuelCost + dailyReport.etcFees)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MRDailyReport;
