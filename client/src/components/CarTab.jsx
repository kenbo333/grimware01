import React, { useState } from "react";
import { SelectStatus } from "./SelectStatus";
import { useFormUpdate, usePathChange, useSaveData } from "@/utils/handle";
import { NameFrom } from "./InputForm";

const CarTab = ({ cars, querySel }) => {
  const car = cars.find((item) => item.id === querySel);

  //オブジェクトから配列を除去
  const { ...initialData } = car;
  //inputの表示とオブジェクトの更新
  const { formData, updateObject } = useFormUpdate(initialData);

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = () => {
    saveData();
    //元請会社のチェック||statusが不変時
    if (car.f_status === formData.f_status) {
      //再レンダリング
      pathChange(formData.id, false);
    } else {
      //変更時、selを上に移動
      const index = cars.findIndex((item) => item.id === querySel);
      if (index) {
        pathChange(cars[index - 1].id, false);
      } else {
        pathChange("", false);
      }
    }
  };

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "保険", tab3: "整備履歴", tab4: "備考" };
  const [activeTab, setActiveTab] = useState("tab1");

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div className="h3">{car.carName}</div>
        <div>
          <SelectStatus formData={formData} updateObject={updateObject} />
        </div>
      </div>

      <ul className="nav nav-tabs">
        {Object.keys(tabs).map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tabs[tab]}
            </button>
          </li>
        ))}
      </ul>

      {/* tab */}
      <div className="tab-content">
        {/* tab1 */}
        <div
          className={`tab-pane fade ${
            activeTab === "tab1" ? "show active" : ""
          } my-3`}
          id="tab1"
          role="tabpanel"
        >
          <form>
            <NameFrom
              title="車両名"
              nameKey="carName"
              formData={formData}
              updateObject={updateObject}
            />

            <hr />
            <button type="button" className="btn btn-info" onClick={handleSave}>
              保存
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarTab;
