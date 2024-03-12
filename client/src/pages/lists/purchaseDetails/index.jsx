import React from "react";
import Navbar from "@/components/layout/Navbar";
import { DataGridPremium, jaJP } from "@mui/x-data-grid-premium";
import { apiClient } from "../../../../lib/apiClient";
import { formatDateForDataGrid } from "@/utils/muiX";
import { formatAsYen } from "@/utils/formatting";

export const getServerSideProps = async (context) => {
  try {
    const response = await apiClient.get("/purchaseDetails");
    // オブジェクトの変更
    const rows = response.data.map((row) => {
      const { company, companyBranch, project, ...rest } = row;
      return {
        ...rest,
        companyName: company.name,
        companyBranch: companyBranch.name,
        projectName: project.name,
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
    headerName: "納入日",
    field: "date",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  { headerName: "工番", field: "projectNumber", width: 120 },
  { headerName: "名称", field: "name", width: 120 },
  { headerName: "型式", field: "model", width: 120 },
  {
    headerName: "単価",
    field: "unitPrice",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  { headerName: "数量", field: "quantity", type: "number", width: 120 },
  {
    headerName: "金額",
    field: "totalPrice",
    type: "number",
    valueFormatter: ({ value }) => formatAsYen(value),
    width: 120,
  },
  // { headerName: "備考", field: "", width: 120 },
  { headerName: "仕入会社", field: "companyName", width: 120 },
  { headerName: "店社", field: "companyBranchName", width: 120 },
  { headerName: "プロジェクト名", field: "projectName", width: 200 },
];

const initialState = {
  aggregation: {
    model: {
      totalPrice: "sum",
    },
  },
};

const PurchaseDetailList = (props) => {
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

export default PurchaseDetailList;
