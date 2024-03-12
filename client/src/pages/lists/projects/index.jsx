import React from "react";
import Navbar from "@/components/layout/Navbar";
import { formatAsYen } from "@/utils/formatting";
import { DataGridPremium, jaJP } from "@mui/x-data-grid-premium";
import { apiClient } from "../../../../lib/apiClient";
import { formatDateForDataGrid } from "@/utils/muiX";

export const getServerSideProps = async (context) => {
  try {
    const response = await apiClient.get("/projects");
    // オブジェクトの変更
    const rows = response.data.map((row) => {
      const {
        primeCompany,
        address1,
        address2,
        chiefCompanyEmployee,
        ...rest
      } = row;
      return {
        ...rest,
        primeCompanyName: primeCompany.name,
        address: address1 + address2,
        chiefName: chiefCompanyEmployee
          ? `${chiefCompanyEmployee.lastName} ${chiefCompanyEmployee.firstName}`
          : "",
      };
    });
    return { props: { rows } };
  } catch (error) {
    console.error(error);
    return { props: { rows: [] } }; // エラー時は空配列を返す
  }
};

const columns = [
  { headerName: "工番", field: "projectNumber", width: 120 },
  { headerName: "元請会社", field: "primeCompanyName", width: 150 },
  { headerName: "名称", field: "name", width: 150 },
  { headerName: "住所", field: "address", width: 150 },
  { headerName: "主任技術者", field: "chiefName", width: 150 },
  {
    headerName: "請負金額",
    field: "contractAmount",
    type: "number",
    width: 130,
    valueFormatter: ({ value }) => formatAsYen(value),
  },
  {
    headerName: "Start Date",
    field: "projectStartDate",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
  {
    headerName: "End Date",
    field: "projectEndDate",
    type: "date",
    valueFormatter: ({ value }) => formatDateForDataGrid(value),
    width: 120,
  },
];

const initialState = {
  aggregation: { model: { contractAmount: "sum" } },
};

const ProjectList = (props) => {
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

export default ProjectList;
