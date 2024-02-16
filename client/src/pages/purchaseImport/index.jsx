import Navbar from "@/components/layout/Navbar";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import { apiClient } from "../../../lib/apiClient";
import { useFetchSingle } from "@/components/containers/useFetchData";
import SelectPurchase from "@/components/purchaseImport/selectPurchase";

const inputStyles = {
  納入日: { width: "90px" },
  工番: { width: "80px" },
  名称: { width: "100%" },
  型式: { width: "100%" },
  単価: { width: "80px", textAlign: "right" },
  数量: { width: "60px", textAlign: "right" },
  金額: { width: "100px", textAlign: "right" },
};

const ExcelReader = () => {
  const [items, setItems] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      // 数値フィールドを変換する関数
      const parseValue = (value) => parseFloat(value.replace(/,/g, "").trim());
      // 日付形式を "YYYY-MM-DD" に変換する関数
      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr
          .split("/")
          .map((num) => String(num).padStart(2, "0"));
        return `${year}-${month}-${day}`;
      };
      // 各データ項目の数値フィールドを変換し、日付のフォーマットを更新
      const formattedData = jsonData.map((item) => {
        return {
          ...item,
          納入日: item["納入日"] ? formatDate(item["納入日"]) : "",
          単価: item["単価"] ? parseValue(item["単価"]).toLocaleString() : null,
          数量: item["数量"] ? parseValue(item["数量"]).toLocaleString() : null,
          金額: item["金額"] ? parseValue(item["金額"]).toLocaleString() : null,
        };
      });
      setItems(formattedData);
      console.log(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleValueChange = (e, index, key) => {
    const { value } = e.target;
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setItems(newItems);
  };

  const handleSave = async () => {
    try {
      await apiClient.post(
        "/purchaseDetails/bulk",
        // companyIds: selectedCompanyIds,
        // fk_projectId: sel,
        items
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="bg-secondary" style={{ height: "47px" }}></div>

      <div className="container-lg">
        <SelectPurchase />

        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFile}
            />
          </div>
          <div className="col-6">
            <button className="btn btn-primary" onClick={handleSave}>
              登録
            </button>
          </div>
        </div>
        <div className="table-responsive mt-3">
          {/* テーブルをレスポンシブに */}
          <table className="table table-striped">
            {/* Bootstrap テーブルクラスを適用 */}
            <thead>
              {items.length > 0 && (
                <tr>
                  {Object.keys(items[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              )}
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  {Object.keys(item).map((key, i) => (
                    <td key={i} className="px-1">
                      <input
                        style={{
                          ...inputStyles[key],
                          border: "none",
                          backgroundColor: "transparent", //透明
                        }}
                        className="form-control form-control-sm"
                        value={item[key]}
                        // onChange={(e) => handleValueChange(e, index, key)}
                        onChange={() => {}}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExcelReader;
