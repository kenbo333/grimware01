import Navbar from "@/components/layout/Navbar";
import React, { useState } from "react";
import apiClient from "../../../lib/apiClient";
import { getData } from "@/utils/SSR";
import { useRouter } from "next/router";
import { usePathManager } from "@/components/containers/handleItem";
import NavTabs from "@/components/forms/NavTabs";
import DailyReportA from "@/components/layout/dairyReport/DailyReportA";
import DailyReportB from "@/components/layout/dairyReport/DailyReportB";

export const getServerSideProps = (context) => getData("/dailies");

const Daily = (props) => {
  const router = useRouter();
  const { sel } = router.query;

  const dailies = props.data;

  const { pathChange } = usePathManager();

  const tabs = ["A", "B", "計算"];
  const [activeTab, setActiveTab] = useState("A");

  //今日の日付作成
  const handleAdd = async () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 1を足すことで月を1-12の範囲に調整
    const day = today.getDate().toString().padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    try {
      await apiClient.post("/dailies", { id: dateString });
    } catch (error) {
      console.log(error);
    }
  };

  //日付表記を変更
  const convertDateToDay = (dateString) => {
    // 日付の分割
    const [year, month, day] = dateString
      .split("-")
      .map((num) => parseInt(num, 10));
    // Date オブジェクトの作成
    const date = new Date(year, month - 1, day); // 月は0から始まるので、1を引く
    // 曜日の取得
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    const dayName = dayNames[date.getDay()];

    // 新しい形式で組み立て
    return `${year}/${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}(${dayName})`;
  };

  return (
    <div>
      <Navbar />

      {/* ----- */}
      <div className="bg-secondary">
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-success m-1"
            // onClick={() => setIsModalOpen(true)}
            onClick={() => handleAdd()}
          >
            新規作成
          </button>

          <button
            type="button"
            className="btn btn-danger m-1"
            // onClick={deleteItem}
          >
            削除
          </button>
        </div>
      </div>

      <div className="container-lg">
        <div className="row my-2">
          <div className="col-3">
            <div className="overflow-auto" style={{ height: "750px" }}>
              <div className="list-group">
                {dailies.map((daily) => (
                  <button
                    key={daily.id}
                    type="button"
                    className={`list-group-item ${
                      sel === daily.id ? "active" : ""
                    }`}
                    onClick={() => pathChange(daily.id, true)}
                    style={{ minHeight: "40px" }}
                  >
                    {convertDateToDay(daily.id)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {sel && (
            <div className="col-9">
              <NavTabs
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {activeTab === "A" && <DailyReportA sel={sel} />}
              {activeTab === "B" && <DailyReportB sel={sel} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Daily;
