import React from "react";
import { HalfForm } from "@/components/forms/InputForm";
import Link from "next/link";
import { useFetchMulti } from "@/components/containers/useFetchData";
import { formatAsYen } from "@/utils/formatting";

// 請求割合を計算するためのヘルパー関数
const calculateBillingRate = (cumulativeInvoiceAmount, contractAmount) =>
  contractAmount > 0 ? (cumulativeInvoiceAmount / contractAmount) * 100 : 0;

// 月次レポート行をレンダリングするサブコンポーネント
const MonthlyReportRow = ({
  monthlyReport,
  cumulativeInvoiceAmount,
  contractAmount,
  monthlyCost,
  sel,
}) => {
  const billingRate = calculateBillingRate(
    cumulativeInvoiceAmount,
    contractAmount
  );
  return (
    <div className="row" key={monthlyReport.id}>
      <div className="col-3 small">
        <Link href={`/projects/${sel}/monthlyReports?sel=${monthlyReport.id}`}>
          {monthlyReport.closingDate}
        </Link>
      </div>
      <div className="col-1">{monthlyReport.dailyReport.length}</div>
      <div className="col-3">{formatAsYen(monthlyCost?.totalCosts ?? 0)}</div>
      <div className="col-3">{formatAsYen(monthlyReport.invoiceAmount)}</div>
      <div className="col-2">{billingRate.toFixed(2)}%</div>
    </div>
  );
};

const PJMonthlyReport = (props) => {
  const { sel, formUtils } = props;
  const urls = [`/projects/${sel}`, `/projects/${sel}/totalCosts`];

  const { data, isLoading, isError } = useFetchMulti(urls);
  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const [project, monthlyCosts] = data;

  const contractAmount = formUtils.formData.contractAmount || 0; // 請負金額
  let cumulativeInvoiceAmount = 0; // 累積請求金額の初期化

  // 請求残金(税抜)
  const remainingInvoiceAmount = () => {
    const totalInvoiceAmount = project.monthlyReport.reduce(
      (acc, cur) => acc + cur.invoiceAmount,
      0
    );
    return formatAsYen(formUtils.formData.contractAmount - totalInvoiceAmount);
  };

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col-6">
          <HalfForm
            title="見積金額(税抜)"
            nameKey="estimateAmount"
            formUtils={formUtils}
          />
          <HalfForm
            title="請負金額(税抜)"
            nameKey="contractAmount"
            formUtils={formUtils}
          />
          <HalfForm
            title="請負金額(税込)"
            nameKey="contractAmountWithTax"
            formUtils={formUtils}
          />
        </div>
        <div className="col-6">
          <div>{`請求残金(税抜) ${remainingInvoiceAmount()}`}</div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-2"></div>
        <div className="col-2">人工数</div>
        <div className="col-3">原価金額</div>
        <div className="col-3">請求金額</div>
        <div className="col-2">請求割合</div>
      </div>

      {project.monthlyReport.map((monthlyReport) => {
        cumulativeInvoiceAmount += monthlyReport.invoiceAmount; // 累積請求金額の更新
        // 月報配列の締日が同じ原価オブジェクトを返す
        const monthlyCost = monthlyCosts.find(
          ({ closingDate }) => closingDate === monthlyReport.closingDate
        );
        return (
          <MonthlyReportRow
            key={monthlyReport.id}
            monthlyReport={monthlyReport}
            cumulativeInvoiceAmount={cumulativeInvoiceAmount}
            contractAmount={contractAmount}
            monthlyCost={monthlyCost}
            sel={sel}
          />
        );
      })}
    </div>
  );
};

export default PJMonthlyReport;
