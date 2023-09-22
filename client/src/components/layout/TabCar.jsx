import React, { useState } from "react";
import { SelectStatus } from "../forms/SelectStatus";
import {
  useFormUpdate,
  usePathChange,
  useSaveData,
} from "@/components/containers/handleItem";
import { NameFrom, SelectForm, StartEndForm } from "../forms/InputForm";
import InfoListCarMaintenance from "./InfoListCarMaintenance";
import TabRemark from "./TabRemark";
import { useRouter } from "next/router";

const TabCar = (props) => {
  const { cars, fuels } = props;
  const router = useRouter();
  const { sel } = router.query;
  const car = cars.find((item) => item.id === sel);

  //タブ設定
  const tabs = { tab1: "詳細", tab2: "保険", tab3: "整備履歴", tab4: "備考" };
  const [activeTab, setActiveTab] = useState("tab1");

  //オブジェクトから配列を除去
  const { ...initialData } = car;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormUpdate(initialData);
  const { formData } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData(formData);
  const { pathChange } = usePathChange();
  const handleSave = () => {
    saveData(`/cars/${sel}`);
    //statusが不変時
    if (car.isStatus === formData.isStatus) {
      //再レンダリング
      pathChange(formData.id, false);
    } else {
      //変更時、selを上に移動
      const index = cars.findIndex((item) => item.id === sel);
      if (index) {
        pathChange(cars[index - 1].id, false);
      } else {
        pathChange("", false);
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div className="h3">{car.carName}</div>
        <div>
          <SelectStatus formUtils={formUtils} />
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
        {activeTab === "tab1" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab1"
            role="tabpanel"
          >
            <form>
              <div className="mb-2">
                <NameFrom
                  title="車両名"
                  nameKey="carName"
                  formUtils={formUtils}
                />
              </div>
              <div className="mb-2">
                <NameFrom
                  title="車両番号"
                  nameKey="carNumber"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="車体番号"
                  nameKey="frameNumber"
                  formUtils={formUtils}
                />
                <NameFrom title="型式" nameKey="model" formUtils={formUtils} />
              </div>
              <div className="mb-2">
                <NameFrom
                  title="初度登録年月"
                  nameKey="firstRegistration"
                  formUtils={formUtils}
                />
                <StartEndForm
                  title="車検"
                  startKey="inspectionStartDate"
                  endKey="inspectionEndDate"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="ETC"
                  nameKey="etcNumber"
                  formUtils={formUtils}
                />
              </div>
              <div className="mb-2">
                <SelectForm
                  title="車両燃料"
                  items={fuels}
                  nameKey="fk_fuelType"
                  viewKey="fuelType"
                  isAllowEmpty={true}
                  formUtils={formUtils}
                />
                <NameFrom
                  title="燃費"
                  nameKey="fuelConsumption"
                  formUtils={formUtils}
                />
              </div>

              <hr />
              <button
                type="button"
                className="btn btn-info"
                onClick={handleSave}
              >
                保存
              </button>
            </form>
          </div>
        )}

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab2"
            role="tabpanel"
          >
            <form>
              <div className="mb-2">
                <NameFrom
                  title="自賠会社"
                  nameKey="compInsCompanyName"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="自賠番号"
                  nameKey="compInsNumber"
                  formUtils={formUtils}
                />
                <StartEndForm
                  title="自賠期間"
                  startKey="inspectionStartDate"
                  endKey="inspectionEndDate"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="自賠氏名"
                  nameKey="compInsContractorName"
                  formUtils={formUtils}
                />
              </div>
              <div className="mb-2">
                <NameFrom
                  title="任意会社"
                  nameKey="volInsCompanyName"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="任意番号"
                  nameKey="volInsNumber"
                  formUtils={formUtils}
                />
                <StartEndForm
                  title="任意期間"
                  startKey="volInsStartDate"
                  endKey="volInsEndDate"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="任意氏名"
                  nameKey="volInsContractorName"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="年齢条件"
                  nameKey="volInsAgeRequirement"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="対人金額"
                  nameKey="volInsPersonal"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="対物金額"
                  nameKey="volInsProperty"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="搭乗者"
                  nameKey="volInsPassenger"
                  formUtils={formUtils}
                />
                <NameFrom
                  title="車両保険"
                  nameKey="volInsCar"
                  formUtils={formUtils}
                />
              </div>
            </form>
          </div>
        )}

        {/* tab3 */}
        {activeTab === "tab3" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab3"
            role="tabpanel"
          >
            <InfoListCarMaintenance sel={sel} />
          </div>
        )}

        {/* tab4 */}
        {activeTab === "tab4" && (
          <div
            className="tab-pane fade show active my-3"
            id="tab4"
            role="tabpanel"
          >
            <TabRemark sel={sel} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabCar;