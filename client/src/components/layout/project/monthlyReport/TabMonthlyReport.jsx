import { useFormEditor } from "@/components/containers/handleItem";
import { useRouter } from "next/router";
import React, { useState } from "react";

const tabs = ["勘定", "日報", "仕入", "外注", "経費"];

const TabMonthlyReport = (props) => {
  const { reports, sel } = props;
  const report = reports.find((item) => item.id === sel);

  //オブジェクトから配列を除去
  const { ...initialData } = report;

  const [activeTab, setActiveTab] = useState("詳細");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  return (
    <div>
      <div>TabMonthlyReport</div>
    </div>
  );
};

export default TabMonthlyReport;
