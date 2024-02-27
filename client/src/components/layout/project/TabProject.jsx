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
import { apiClient } from "../../../../lib/apiClient";
import PJFinancialModal from "./PJFinancialsModal";

const tabs = ["詳細", "関係者", "勘定", "ファイル"];

const StatusButton = ({ isStatus, label }) => {
  return (
    <button
      type="button"
      className={`btn ${isStatus ? "btn-success" : "btn-outline-success"}`}
      disabled={!isStatus}
    >
      {label}
    </button>
  );
};

const TabProject = (props) => {
  const { projects, isCreateState, sel } = props;
  const project = projects.find((item) => item.id === sel);
  const [isModal, setIsModal] = useState(false);

  const router = useRouter();

  // オブジェクトから配列を除去
  const { primeCompany, ...initialData } = project;

  const [activeTab, setActiveTab] = useState("勘定");

  // inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  // 月報の確認と新規作成
  const checkAndCreateMonthlyReports = async () => {
    try {
      // 月報データ取得
      const response = await apiClient.get(`/projects/${sel}`);
      const monthlyReports = response.data.monthlyReport;
      // 既存の月報締日の配列
      const closingDates = monthlyReports.map(({ closingDate }) => closingDate);
      // inputに対しての月報締日の配列
      const inputClosingDates = getClosingDatesList(
        formData.ownProjectStartDate,
        primeCompany.closingDay
      );
      // 現在とinputの差分の配列
      const differenceDates = findDifference(
        closingDates.map((date) => formatDate(new Date(date))),
        inputClosingDates.map((date) => formatDate(new Date(date)))
      );
      // ------月報作成------
      if (closingDates.length < inputClosingDates.length) {
        try {
          // 月報の差分だけバルクインサート
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

  // formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      if (newFormData.ownProjectStartDate !== initialData.ownProjectStartDate)
        await checkAndCreateMonthlyReports();
      await saveData(`/projects/${sel}`, newFormData);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  // 編集モード
  useEffect(() => {
    isCreateState.isCreate && (startEdit(), isCreateState.setIsCreate(false));
  }, [isCreateState.isCreate]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div className="fs-4 fw-bold">{project.projectNumber}</div>

        <div className="btn-group btn-group-sm my-1">
          <StatusButton isStatus={!!formData.estimateAmount} label="見積済" />
          <StatusButton
            isStatus={!!formData.ownProjectStartDate}
            label="工事中"
          />
          <StatusButton isStatus={formData.isConstructed} label="工事完了" />
          <StatusButton isStatus={formData.isPaid} label="入金完了" />
        </div>

        <div className="fs-5">{primeCompany.closingDay}日締</div>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <div className="h2" style={{ color: "#599429" }}>
            {project.name}
          </div>
          <div>{/* <SelectStatus formUtils={formUtils} /> */}</div>
          <div className="h6">{primeCompany.name}</div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setIsModal(true)}
        >
          収支グラフ
        </button>
        {isModal && (
          <PJFinancialModal sel={sel} onClose={() => setIsModal(false)} />
        )}
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && <PJDetail formUtils={formUtils} />}

        {/* 関係者 */}
        {activeTab === "関係者" && (
          <PJStakeholder
            formUtils={formUtils}
            sel={sel}
            primeCompanyId={primeCompany.id}
          />
        )}

        {/* 勘定 */}
        {activeTab === "勘定" && (
          <PJMonthlyReport formUtils={formUtils} sel={sel} />
        )}

        {/* ファイル */}
        {activeTab === "ファイル" && (
          <InfoListRemark fkName="fk_projectId" sel={sel} />
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
