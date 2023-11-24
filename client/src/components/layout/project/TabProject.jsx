import React, { useEffect, useState } from "react";
import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import { useRouter } from "next/router";
import { ButtonEdit } from "../../ui/ButtonEdit";
import NavTabs from "../../forms/NavTabs";
import InfoListRemark from "../InfoListRemark";
import PJDetail from "./PJDetail";
import PJStakeholder from "./PJStakeholder";
import PJMonthlyReport from "./PJMonthlyReport";
import {
  findDifference,
  formatDate,
  getClosingDatesList,
} from "@/components/containers/getClosingDatesList";
import apiClient from "../../../../lib/apiClient";

const tabs = ["詳細", "関係者", "勘定", "ファイル", "仕入"];

const TabProject = (props) => {
  const { projects, isCreateState, sel } = props;
  const project = projects.find((item) => item.id === sel);

  const router = useRouter();

  //オブジェクトから配列を除去
  const { companyPrime, ...initialData } = project;

  const [activeTab, setActiveTab] = useState("詳細");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  //月報の確認と新規作成
  const checkAndCreateMonthlyReports = async () => {
    try {
      //月報データ取得
      const response = await apiClient.get(`/projects/${sel}/monthlyReports`);
      const monthlyReports = response.data;
      //既存の月報締日の配列
      const closingDates = monthlyReports.map((item) => item.closingDate);
      //inputに対しての月報締日の配列
      const inputClosingDates = getClosingDatesList(
        formData.ownProjectStartDate,
        companyPrime.closingDay
      );
      //現在とinputの差分の配列
      const differenceDates = findDifference(
        closingDates.map((date) => formatDate(new Date(date))),
        inputClosingDates.map((date) => formatDate(new Date(date)))
      );

      //------月報作成------
      if (closingDates.length < inputClosingDates.length) {
        try {
          //月報の差分だけバルクインサート
          await apiClient.post(`/projects/${sel}/monthlyReports/bulk`, {
            closingDates: differenceDates,
            fk_projectId: sel,
          });
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      await saveData(`/projects/${sel}`, newFormData);
      await checkAndCreateMonthlyReports();
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  //編集モード
  useEffect(() => {
    isCreateState.isCreate && (startEdit(), isCreateState.setIsCreate(false));
  }, [isCreateState.isCreate]);

  return (
    <div>
      <div className="d-flex justify-content-between mt-2">
        <div className="h4">{project.projectId}</div>
        <div className="h5">{companyPrime.closingDay}日締</div>
      </div>
      <div className="h2" style={{ color: "#599429" }}>
        {project.name}
      </div>
      <div>{/* <SelectStatus formUtils={formUtils} /> */}</div>
      <div className="h6">{companyPrime.name}</div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && <PJDetail formUtils={formUtils} />}

        {/* 関係者 */}
        {activeTab === "関係者" && (
          <PJStakeholder formUtils={formUtils} sel={sel} />
        )}

        {/* 勘定 */}
        {activeTab === "勘定" && (
          <div className="tab-pane fade show active my-3" id="勘定">
            <div>
              <PJMonthlyReport formUtils={formUtils} sel={sel} />
            </div>
          </div>
        )}

        {/* ファイル */}
        {activeTab === "ファイル" && (
          <div className="tab-pane fade show active my-3" id="ファイル">
            <InfoListRemark fkName="fk_projectId" sel={sel} />
          </div>
        )}

        {/* 仕入 */}
        {activeTab === "仕入" && (
          <div className="tab-pane fade show active my-3" id="仕入">
            仕入
          </div>
        )}

        <hr />

        {["詳細", "関係者", "勘定"].includes(activeTab) && (
          <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default TabProject;
