import React from "react";
import Navbar from "@/components/layout/Navbar";
import { DataGridPremium, jaJP } from "@mui/x-data-grid-premium";
import { apiClient } from "../../../../lib/apiClient";
import { formatDateForDataGrid } from "@/utils/muiX";
import { formatAsYen } from "@/utils/formatting";

export const getServerSideProps = async (context) => {
  try {
    const response = await apiClient.get("/monthlyReports");
    // オブジェクトの変更
    const rows = response.data.map((row) => {
      const { project, ...rest } = row;
      return {
        ...rest,
        projectNumber: project.projectNumber,
        projectName: project.name,
        primeCompanyName: project.primeCompany.name,
      };
    });
    return { props: { rows } };
  } catch (error) {
    console.error(error);
    return { props: { rows: [] } }; // エラー時は空配列を返す
  }
};

const columns = [
  { headerName: "締日(仮)", field: "closingDate", width: 120 },
  { headerName: "工番", field: "projectNumber", width: 120 },
  { headerName: "名称", field: "projectName", width: 200 },
  { headerName: "元請会社", field: "primeCompanyName", width: 200 },
  {
    headerName: "請求金額",
    field: "invoiceAmount",
    type: "number",
    width: 150,
    valueFormatter: ({ value }) => formatAsYen(value),
  },
  {
    headerName: "請求金額(税込)",
    field: "invoiceAmountWithTax",
    type: "number",
    width: 150,
    valueFormatter: ({ value }) => formatAsYen(value),
  },
  {
    headerName: "請求日",
    field: "invoiceDate",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "入金予定日1",
    field: "invoiceDueDate1",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "入金日1(現金)",
    field: "paymentCash1",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "(手形)",
    field: "paymentNote1",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  {
    headerName: "(電債)",
    field: "paymentEBond1",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  {
    headerName: "入金予定日1",
    field: "invoiceDueDate2",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "入金日2(現金)",
    field: "paymentCash2",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "(手形)",
    field: "paymentNote2",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  {
    headerName: "(電債)",
    field: "paymentEBond2",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  {
    headerName: "調整金額",
    field: "adjustmentAmount",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  // { headerName: "入金差額", field: "", width: 120 },
  // { headerName: "請求残金", field: "", width: 120 },
  // { headerName: "請求割合", field: "", width: 120 },
  // { headerName: "入金合計", field: "", width: 120 },
  // { headerName: "備考", field: "", width: 120 },
];

const initialState = {
  aggregation: {
    model: {
      invoiceAmount: "sum",
      invoiceAmountWithTax: "sum",
      adjustmentAmount: "sum",
      // lateOvertime: "sum",
      // driving: "sum",
    },
  },
};

const MonthlyReportList = (props) => {
  const { rows } = props;

  return (
    <div>
      <Navbar />

      <div style={{ height: 800, width: "100%" }}>
        <DataGridPremium
          localeText={jaJP.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          initialState={initialState}
          unstable_headerFilters // ヘッダーフィルター
          slots={{ headerFilterMenu: null }} // ヘッダーフィルターのアイコン非表示
        />
      </div>
    </div>
  );
};

export default MonthlyReportList;
