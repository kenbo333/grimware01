import React from "react";
import Navbar from "@/components/layout/Navbar";
import { DataGridPremium, jaJP } from "@mui/x-data-grid-premium";
import { apiClient } from "../../../../lib/apiClient";
import { formatDateForDataGrid } from "@/utils/muiX";

export const getServerSideProps = async (context) => {
  try {
    const response = await apiClient.get("/dailyReports");
    // オブジェクトの変更
    const rows = response.data.map((row) => {
      const { company, companyEmployee, monthlyReport, ...rest } = row;
      return {
        ...rest,
        companyName: company?.name,
        empName: companyEmployee
          ? `${companyEmployee.lastName} ${companyEmployee.firstName}`
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
    field: "fk_dailyId",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  { headerName: "会社名", field: "companyName", width: 120 },
  { headerName: "氏名", field: "empName", width: 150 },
  { headerName: "プロジェクト名", field: "projectName", width: 150 },
  { headerName: "始業", field: "startTime", width: 80 },
  { headerName: "終業", field: "endTime", width: 80 },
  { headerName: "休憩時間", field: "breakTime", width: 80 },
  { headerName: "日勤", field: "day", type: "number", width: 80 },
  { headerName: "夜勤", field: "night", type: "number", width: 80 },
  { headerName: "残業", field: "overtime", type: "number", width: 80 },
  { headerName: "深夜残業", field: "lateOvertime", type: "number", width: 80 },
  { headerName: "休日", field: "isDayOff", width: 80 },
  // { headerName: "有休", field: "endTime", width: 80 },
  { headerName: "出張", field: "isBusinessTrip", width: 80 },
  { headerName: "夜食", field: "isNightMeal", width: 80 },
  { headerName: "特別給", field: "isSpecialLeave", width: 80 },
  { headerName: "育児休", field: "isParentalLeave", width: 80 },
  { headerName: "介護休", field: "isCaregivingLeave", width: 80 },
  { headerName: "運転", field: "driving", type: "number", width: 80 },
  { headerName: "op1", field: "option1", width: 80 },
  { headerName: "op2", field: "option2", width: 80 },
];

const initialState = {
  aggregation: {
    model: {
      day: "sum",
      night: "sum",
      overtime: "sum",
      lateOvertime: "sum",
      driving: "sum",
    },
  },
};

const DailyReportList = (props) => {
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

export default DailyReportList;
