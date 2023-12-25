import { useFormEditor, useSaveData } from "@/components/containers/handleItem";
import { HalfFrom } from "@/components/forms/InputForm";
import NavTabs from "@/components/forms/NavTabs";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import { useRouter } from "next/router";
import React, { useState } from "react";
import MRAccounting from "./MRAccounting";

const tabs = ["会計", "日報", "仕入", "外注", "経費"];
const keysToParse = [
  "invoiceAmount",
  "invoiceAmountWithTax",
  "invoiceDueDate1",
  "invoiceDueDate2",
  "paymentCash1",
  "paymentCash2",
  "paymentNote1",
  "paymentNote2",
  "paymentEBond1",
  "paymentEBond2",
  "adjustmentAmount",
];

const TabMonthlyReport = (props) => {
  const { reports, sel } = props;
  const report = reports.find((item) => item.id === sel);

  const router = useRouter();

  //オブジェクトから配列を除去
  const { project, ...initialData } = report;

  const [activeTab, setActiveTab] = useState("会計");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  const { saveData } = useSaveData();
  const handleSave = async () => {
    try {
      const endFormData = endEdit();

      const parseIntIfNumber = (value) =>
        isNaN(value) ? value : parseInt(value, 10);

      const newFormData = keysToParse.reduce(
        (formData, key) => ({
          ...formData,
          [key]: parseIntIfNumber(endFormData[key]),
        }),
        endFormData
      );

      // console.log(newFormData);
      await saveData(
        `/projects/${report.fk_projectId}/monthlyReports/${sel}`,
        newFormData
      );
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mt-2">
        <div className="h4">{project.projectId}</div>
        <div className="h5">{project.companyPrime.closingDay}日締</div>
      </div>
      <div className="h2" style={{ color: "#599429" }}>
        {project.name}
      </div>
      <div className="h6">{project.companyPrime.name}</div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 会計 */}
        {activeTab === "会計" && <MRAccounting formUtils={formUtils} />}
      </div>

      <hr />

      {["会計"].includes(activeTab) && (
        <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
      )}
    </div>
  );
};

export default TabMonthlyReport;
