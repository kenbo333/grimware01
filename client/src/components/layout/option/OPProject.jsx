import { useFormEditor, useSaveData } from "@/components/containers/handleItem";
import { HalfFrom, NameFrom } from "@/components/forms/InputForm";
import NavTabs from "@/components/forms/NavTabs";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import React, { useState } from "react";

const tabs = ["区分1", "区分2", "その他"];

const OPProject = (props) => {
  const { projType1, projType2, ...other } = props.option;

  const [activeTab, setActiveTab] = useState("区分1");

  const fields1 = Object.keys(projType1).filter((key) => key !== "id");
  const fields2 = Object.keys(projType2).filter((key) => key !== "id");

  //inputの表示とオブジェクトの更新
  const formUtils1 = useFormEditor(projType1);
  const formUtils2 = useFormEditor(projType2);
  const formUtils = useFormEditor(other);

  const { saveData } = useSaveData();

  const handleSave1 = async () => {
    const updateData = formUtils1.endEdit();
    await saveData("/options/1/projType1/1", updateData);
  };
  const handleSave2 = async () => {
    const updateData = formUtils2.endEdit();
    await saveData("/options/1/projType2/1", updateData);
  };

  const handleSave = async () => {
    const updateData = formUtils.endEdit();
    await saveData("/options/1", updateData);
  };
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <h2>プロジェクト</h2>
        </div>
      </div>

      <NavTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* tab */}
      <div className="tab-content">
        <div className="tab-pane active my-3">
          {/* 区分1 */}
          {activeTab === "区分1" && (
            <div className="row">
              <div className="col-6">
                {fields1.map((field) => (
                  <div className="mb-1" key={field}>
                    <NameFrom
                      title={field}
                      nameKey={field}
                      formUtils={formUtils1}
                    />
                  </div>
                ))}
                <hr />
                <ButtonEdit formUtils={formUtils1} handleSave={handleSave1} />
              </div>
            </div>
          )}
        </div>

        {/* 区分2 */}
        {activeTab === "区分2" && (
          <div className="row">
            <div className="col-6">
              {fields2.map((field) => (
                <div className="mb-1" key={field}>
                  <NameFrom
                    title={field}
                    nameKey={field}
                    formUtils={formUtils2}
                  />
                </div>
              ))}
              <hr />
            </div>
            <ButtonEdit formUtils={formUtils2} handleSave={handleSave2} />
          </div>
        )}
      </div>

      {/* その他 */}
      {activeTab === "その他" && (
        <div className="row">
          <div className="col-6">
            <div className="mb-4">
              <HalfFrom
                title="消費税率"
                nameKey="SalesTaxRate"
                formUtils={formUtils}
              />
            </div>

            <div className="mb-4">
              <h6 className="text-center">請求上乗せ率</h6>
              <HalfFrom
                title="材料,外注"
                nameKey="markupRateMaterial"
                formUtils={formUtils}
              />
              <HalfFrom
                title="経費"
                nameKey="markupRateSubcontract"
                formUtils={formUtils}
              />
            </div>

            <div className="mb-4">
              <h6 className="text-center">手当</h6>
              <HalfFrom
                title="運転"
                nameKey="allowanceDriving"
                formUtils={formUtils}
              />
              <HalfFrom
                title="出張"
                nameKey="allowanceTravel"
                formUtils={formUtils}
              />
              <HalfFrom
                title="夜食"
                nameKey="allowanceMeal"
                formUtils={formUtils}
              />
            </div>

            <div className="mb-4">
              <h6 className="text-center">希望請求額</h6>
              <HalfFrom
                title="月-土"
                nameKey="laborChargeWeekday"
                formUtils={formUtils}
              />
              <HalfFrom
                title="日･祝"
                nameKey="laborChargeHoliday"
                formUtils={formUtils}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-4">
              <h6 className="text-center">ガソリン</h6>
              <HalfFrom
                title="レギュラー"
                nameKey="fuelRegular"
                formUtils={formUtils}
              />
              <HalfFrom
                title="ハイオク"
                nameKey="fuelPremium"
                formUtils={formUtils}
              />
              <HalfFrom
                title="軽油"
                nameKey="fuelDiesel"
                formUtils={formUtils}
              />
            </div>
          </div>
          <hr />
          <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
        </div>
      )}
    </div>
  );
};

export default OPProject;
