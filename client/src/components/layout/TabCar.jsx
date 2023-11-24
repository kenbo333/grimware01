import React, { useEffect, useState } from "react";
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
import NavTabs from "../forms/NavTabs";

const tabs = ["詳細", "保険", "整備履歴", "備考"];

const TabCar = (props) => {
  const { cars, fuels, isCreateState } = props;
  const router = useRouter();
  const { sel } = router.query;
  const car = cars.find((item) => item.id === sel);

  //オブジェクトから配列を除去
  const { ...initialData } = car;

  const [activeTab, setActiveTab] = useState("詳細");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      await saveData(`/cars/${sel}`, newFormData);
      const isStatic = car.isStatus === formData.isStatus;
      pathMove(isStatic, cars, sel);
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
      <div className="d-flex justify-content-between my-3">
        <div className="h3">{car.name}</div>
        <div>
          <SelectStatus formUtils={formUtils} />
        </div>
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        {/* 詳細 */}
        {activeTab === "詳細" && (
          <div className="tab-pane fade show active my-3" id="詳細">
            <form>
              <div className="mb-2">
                <NameFrom title="車両名" nameKey="name" formUtils={formUtils} />
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
                  nameKey="fk_fuelTypeId"
                  viewFn={(item) => item.fuelType}
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

        {/* 保険 */}
        {activeTab === "保険" && (
          <div className="tab-pane fade show active my-3" id="保険">
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

        {/* 整備履歴 */}
        {activeTab === "整備履歴" && (
          <div className="tab-pane fade show active my-3" id="整備履歴">
            <InfoListCarMaintenance sel={sel} />
          </div>
        )}

        {/* 備考 */}
        {activeTab === "備考" && (
          <div className="tab-pane fade show active my-3" id="備考">
            <InfoListRemark sel={sel} fkName="fk_carId" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TabCar;
