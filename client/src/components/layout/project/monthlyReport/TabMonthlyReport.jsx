import { useFormEditor } from "@/components/containers/handleItem";
import NavTabs from "@/components/forms/NavTabs";
import React, { useState } from "react";
import MRAccounting from "./MRAccounting";
import MRDailyReport from "./MRDailyReport";
import MRSub from "./MRSub";
import MRExpenseDetail from "./MRExpenseDetail";

const tabs = ["会計", "日報", "仕入", "外注", "経費"];

const TabMonthlyReport = (props) => {
  const { project, sel } = props;
  const [activeTab, setActiveTab] = useState("外注");

  // console.log(project);

  //オブジェクトから配列を除去
  const { monthlyReport: monthlyReports, primeCompany } = project;
  const monthlyReport = monthlyReports.find((item) => item.id === sel);
  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(monthlyReport);

  return (
    <div>
      <div className="d-flex justify-content-between mt-2">
        <div className="h4">{project.projectNumber}</div>
        <div className="h5">{`${monthlyReport.closingDate} 日締`}</div>
      </div>
      <div className="h2" style={{ color: "#599429" }}>
        {project.name}
      </div>
      <div className="h6">{project.primeCompany.name}</div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 会計 */}
        {activeTab === "会計" && (
          <MRAccounting formUtils={formUtils} sel={sel} />
        )}

        {/* 日報 */}
        {activeTab === "日報" && <MRDailyReport sel={sel} />}

        {/* 仕入 */}

        {/* 外注 */}
        {activeTab === "外注" && <MRSub sel={sel} projectId={project.id} />}

        {/* 経費 */}
        {activeTab === "経費" && <MRExpenseDetail sel={sel} />}
      </div>
    </div>
  );
};

export default TabMonthlyReport;
