import React, { useState } from "react";
import * as XLSX from "xlsx";
import { apiClient } from "../../../lib/apiClient";
import { toast } from "react-toastify";

const inputStyles = {
  date: { width: "90px" },
  projectNumber: { width: "80px" },
  name: { width: "100%" },
  model: { width: "100%" },
  unitPrice: { width: "80px", textAlign: "right" },
  quantity: { width: "40px", textAlign: "right" },
  totalPrice: { width: "100px", textAlign: "right" },
  remark: { width: "100%" },
};

const fieldMappings = {
  date: "納入日",
  projectNumber: "工番",
  name: "名称",
  model: "型式",
  unitPrice: "単価",
  quantity: "数量",
  totalPrice: "金額",
  remark: "備考",
};

// 数値フィールドを変換する関数
const parseValue = (value) => {
  const number = parseFloat(value.replace(/,/g, "").trim());
  return isNaN(number) ? 0 : number;
};

// 日付形式を "YYYY-MM-DD" に変換する関数
const formatDate = (dateStr) => {
  const [year, month, day] = dateStr
    .split("/")
    .map((num) => String(num).padStart(2, "0"));
  return `${year}-${month}-${day}`;
};

const ExcelReader = (props) => {
  const { companyId, companyBranchId } = props;
  const [items, setItems] = useState([]);

  const handleFile = (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

      // 各データ項目の数値フィールドを変換し、日付のフォーマットを更新
      const formattedData = jsonData.map((item) => ({
        date: item["納入日"] ? formatDate(item["納入日"]) : "",
        projectNumber: item["工番"] || "",
        name: item["名称"] || "",
        model: item["型式"] || "",
        unitPrice: item["単価"] ? parseValue(item["単価"]) : null,
        quantity: item["数量"] ? parseValue(item["数量"]) : null,
        totalPrice: item["金額"] ? parseValue(item["金額"]) : null,
        remark: item["備考"] || "",
      }));
      setItems(formattedData);
    };
    reader.readAsBinaryString(file);
  };

  const handleValueChange = (e, index, key) => {
    let { value } = e.target;
    if (["unitPrice", "quantity", "totalPrice"].includes(key)) {
      if (isNaN(value) || value.trim() === "") {
        // 不正な値の場合、エラーメッセージを表示するか、値を設定しない
        console.log("無効な入力: 数値を入力してください");
        return; // ここで処理を中断
      }
      value = parseValue(value);
    }
    const newItems = items.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setItems(newItems);
  };

  const handleSave = async () => {
    try {
      const newItems = items.map((item) => ({
        ...item,
        fk_companyId: companyId,
        fk_companyBranchId: companyBranchId,
      }));
      await apiClient.post("/purchaseDetails/bulk", newItems);
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="row mt-2">
        <div className="col-6">
          <input
            className="form-control"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFile}
          />
        </div>
        <div className="col-6">
          {companyId && companyBranchId && items.length > 0 && (
            <button className="btn btn-primary" onClick={handleSave}>
              登録
            </button>
          )}
        </div>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-striped">
          <thead>
            {items.length > 0 && (
              <tr>
                {Object.keys(items[0]).map((key) => (
                  <th key={key}>{fieldMappings[key]}</th> // 英語のキーに基づいた日本語の表示名を取得
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
                        // backgroundColor: "transparent", //透明
                      }}
                      className="form-control form-control-sm px-1"
                      value={item[key]}
                      onChange={(e) => handleValueChange(e, index, key)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExcelReader;
