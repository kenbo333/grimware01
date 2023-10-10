import React, { useState } from "react";
import { SelectStatus } from "../forms/SelectStatus";
import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import { NameFrom, SelectForm, StartEndForm } from "../forms/InputForm";
import InfoListCarMaintenance from "./InfoListCarMaintenance";
import InfoListRemark from "./InfoListRemark";
import { useRouter } from "next/router";
import { ButtonEdit } from "../ui/ButtonEdit";

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
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = () => {
    const newFormData = endEdit();
    saveData(`/cars/${sel}`, newFormData);
    //statusが不変
    const isStatic = car.isStatus === formData.isStatus;
    pathMove(isStatic, cars, sel);
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
          <div className="tab-pane fade show active my-3" id="tab1">
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
              <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
            </form>
          </div>
        )}

        {/* tab2 */}
        {activeTab === "tab2" && (
          <div className="tab-pane fade show active my-3" id="tab2">
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
              <hr />
              <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
            </form>
          </div>
        )}

        {/* tab3 */}
        {activeTab === "tab3" && (
          <div className="tab-pane fade show active my-3" id="tab3">
            <InfoListCarMaintenance sel={sel} />
          </div>
        )}

        {/* tab4 */}
        {activeTab === "tab4" && (
          <div className="tab-pane fade show active my-3" id="tab4">
            <InfoListRemark sel={sel} fkName="fk_car" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabCar;
