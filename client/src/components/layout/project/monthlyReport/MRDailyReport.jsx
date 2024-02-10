import { useFetchSingle } from "@/components/containers/useFetchData";
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
          {dailyReports
            .reduce((acc, cur) => acc + cur.calcLaborCost, 0)
            .toLocaleString() + "円"}
        </div>
        <div className="col-3 h5">
          {dailyReports
            .reduce(
              (acc, cur) => acc + cur.calcFuelCost + parseInt(cur.etcFees || 0),
              0
            )
            .toLocaleString() + "円"}
        </div>
      </div>

      <hr className="my-1" />

      {dailyReports.map((dailyReport) => (
        <div key={dailyReport.id} className="row">
          <div className="col-3">{dailyReport.fk_dailyId}</div>
          <div className="col-3">{`${dailyReport.companyEmployee.lastName} ${dailyReport.companyEmployee.firstName}`}</div>
          <div className="col-3">
            {dailyReport.calcLaborCost.toLocaleString() + "円"}
          </div>
          <div className="col-3">
            {(
              dailyReport.calcFuelCost + parseInt(dailyReport.etcFees || 0)
            ).toLocaleString() + "円"}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MRDailyReport;
