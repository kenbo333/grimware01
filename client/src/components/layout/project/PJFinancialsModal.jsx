import { useFetchSingle } from "@/components/containers/useFetchData";
import { formatAsYen } from "@/utils/formatting";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const PJFinancialModal = (props) => {
  const { sel, onClose } = props;

  const { data, error, isLoading } = useFetchSingle(`/projects/${sel}/costs`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(data);

  // 合計コストの計算
  const totalCosts =
    data.travelExpenses +
    data.laborCosts +
    data.subcontractorCosts +
    data.purchaseTotals +
    data.otherExpenses;

  // 粗利の計算
  const grossProfit = data.invoiceTotals - totalCosts;

  // 粗利率の計算
  const grossProfitMargin =
    data.invoiceTotals > 0
      ? ((data.invoiceTotals - totalCosts) / data.invoiceTotals) * 100
      : 0;

  const FinancialDetail = ({ label, value }) => (
    <div className="row">
      <div className="col-5">{label}</div>
      <div className="col-7">{value}</div>
    </div>
  );

  // ドーナツグラフのデータとオプションを設定
  const DoughnutChart = (data) => {
    const chartData = {
      labels: [
        "労務費",
        "外注費",
        "仕入高",
        "旅費交通費",
        "その他経費",
        "粗利",
      ],
      datasets: [
        {
          data: [
            data.laborCosts,
            data.subcontractorCosts,
            data.purchaseTotals,
            data.travelExpenses,
            data.otherExpenses,
            Math.max(grossProfit, 0), //
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    return <Doughnut data={chartData} />;
  };

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{data.projectNumber}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            <div className="h4" style={{ color: "#599429" }}>
              {data.name}
            </div>

            <div className="row">
              <div className="col-7">{DoughnutChart(data)}</div>

              <div className="col-5">
                <div className="my-5"></div>
                <FinancialDetail
                  label="請負金額"
                  value={formatAsYen(data.contractAmount)}
                />
                <FinancialDetail
                  label="請求合計"
                  value={formatAsYen(data.invoiceTotals)}
                />
                <hr />
                <FinancialDetail
                  label="労務費合計"
                  value={formatAsYen(data.laborCosts)}
                />
                <FinancialDetail
                  label="外注費合計"
                  value={formatAsYen(data.subcontractorCosts)}
                />
                <FinancialDetail
                  label="仕入高合計"
                  value={formatAsYen(data.purchaseTotals)}
                />
                <FinancialDetail
                  label="旅費交通費合計"
                  value={formatAsYen(data.travelExpenses)}
                />
                <FinancialDetail
                  label="その他経費合計"
                  value={formatAsYen(data.otherExpenses)}
                />
                <div className="my-3"></div>
                <FinancialDetail label="合計" value={formatAsYen(totalCosts)} />
                <hr />
                <FinancialDetail
                  label="粗利"
                  value={formatAsYen(grossProfit)}
                />
                <FinancialDetail
                  label="粗利比率"
                  value={`${parseFloat(grossProfitMargin.toFixed(1))}%`}
                />
              </div>
            </div>
          </div>

          {/* <div className="modal-footer"></div> */}
        </div>
      </div>
    </div>
  );
};

export default PJFinancialModal;
