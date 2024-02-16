import React from "react";
import { HalfFrom } from "@/components/forms/InputForm";
import Link from "next/link";
import { useFetchSingle } from "@/components/containers/useFetchData";

const PJMonthlyReport = (props) => {
  const { sel, formUtils } = props;

  const { data, error, isLoading } = useFetchSingle(`/projects/${sel}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const monthlyReports = data.monthlyReport;

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col-6">
          <HalfFrom
            title="見積金額(税抜)"
            nameKey="estimateAmount"
            formUtils={formUtils}
          />
          <HalfFrom
            title="請負金額(税抜)"
            nameKey="contractAmount"
            formUtils={formUtils}
          />
          <HalfFrom
            title="見積金額(税込)"
            nameKey="contractAmountWithTax"
            formUtils={formUtils}
          />
        </div>
        <div className="col-6">
          <div>{`入金残金`}</div>
          <div>{`請求残金`}</div>
        </div>
      </div>

      <hr />

      <div>
        {monthlyReports.map((monthlyReport) => (
          <div key={monthlyReport.id}>
            <Link
              href={`/projects/${sel}/monthlyReports?sel=${monthlyReport.id}`}
            >
              {monthlyReport.closingDate}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PJMonthlyReport;
