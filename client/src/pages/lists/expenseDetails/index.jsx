import React from "react";
import Navbar from "@/components/layout/Navbar";
import { formatAsYen } from "@/utils/formatting";
import { DataGridPremium, jaJP } from "@mui/x-data-grid-premium";
import { apiClient } from "../../../../lib/apiClient";
import { formatDateForDataGrid } from "@/utils/muiX";

export const getServerSideProps = async (context) => {
  try {
    const response = await apiClient.get("/expenseDetails");
    // オブジェクトの変更
    const rows = response.data.map((row) => {
      const { expense, monthlyReport, ...rest } = row;
      // const { lastName, firstName } = expense.companyEmployee;
      return {
        ...rest,
        fullName: expense.companyEmployee
          ? `${expense.companyEmployee.lastName} ${expense.companyEmployee.firstName}`
          : "",
        projectName: monthlyReport?.project.name ?? "",
      };
    });
    return { props: { rows } };
  } catch (error) {
    console.error(error);
    return { props: { rows: [] } }; // エラー時は空配列を返す
  }
};

const columns = [
  {
    headerName: "日付",
    field: "date",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  { headerName: "氏名", field: "fullName", width: 200 },
  { headerName: "プロジェクト名", field: "projectName", width: 200 },
  { headerName: "科目", field: "account", width: 150 },
  {
    headerName: "金額",
    field: "amount",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  { headerName: "ｸﾚｶ", field: "isCredit", type: "boolean" },
  { headerName: "摘要", field: "", width: 150 },
];

const initialState = {
  aggregation: { model: { amount: "sum" } },
};

const ExpenseDetailList = (props) => {
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

export default ExpenseDetailList;
