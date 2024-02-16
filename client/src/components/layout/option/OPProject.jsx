import { useFormEditor, useSaveData } from "@/components/containers/handleItem";
import { HalfFrom, NameFrom } from "@/components/forms/InputForm";
import NavTabs from "@/components/forms/NavTabs";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import React, { useState } from "react";

const tabs = ["その他", "区分1", "区分2"];

const LocalFrom = (props) => {
  const { title, type, nameKey, span, formUtils } = props;
  const { formData, updateObject } = formUtils;

  const handleChange = (event) => {
    const { id, value } = event.target;
    updateObject(id, value);
  };

  return (
    <div className="row">
      <label className="col-form-label col-sm-4" htmlFor={nameKey}>
        {title}
      </label>
      <div className="col-sm-8">
        <div className="input-group">
          <input
            type={type}
            className="form-control"
            id={nameKey}
            value={formData[nameKey] ?? ""}
            onChange={handleChange}
            disabled={!formData.isEditing}
          />
          <span className="input-group-text">{span}</span>
        </div>
      </div>
    </div>
  );
};

const OPProject = (props) => {
  const { projType1, projType2, ...other } = props.option;

  const [activeTab, setActiveTab] = useState("その他");

  const fields1 = Object.keys(projType1).filter((key) => key !== "id");
  const fields2 = Object.keys(projType2).filter((key) => key !== "id");

  //inputの表示とオブジェクトの更新
  const formUtils1 = useFormEditor(projType1);
  const formUtils2 = useFormEditor(projType2);
  const formUtils = useFormEditor(other);

  const { saveData } = useSaveData();

  const handleSave1 = async () => {
    const updateData = formUtils1.endEdit();
    await saveData("/option/1/projType1/1", updateData);
  };
  const handleSave2 = async () => {
    const updateData = formUtils2.endEdit();
    await saveData("/option/1/projType2/1", updateData);
  };

  const handleSave = async () => {
    const updateData = formUtils.endEdit();
    await saveData("/option/1", updateData);
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
              <LocalFrom
                title="消費税率"
                nameKey="salesTaxRate"
                span="%"
                formUtils={formUtils}
              />
            </div>

            <div className="mb-4">
              <h6 className="text-center">手当</h6>
              <LocalFrom
                title="運転"
                nameKey="allowanceDriving"
                span="円"
                formUtils={formUtils}
              />
              <LocalFrom
                title="出張"
                nameKey="allowanceBusinessTrip"
                span="円"
                formUtils={formUtils}
              />
              <LocalFrom
                title="夜食"
                nameKey="allowanceNightMeal"
                span="円"
                formUtils={formUtils}
              />
            </div>
          </div>

          <div className="col-6">
            <div className="mb-4">
              <h6 className="text-center">ガソリン</h6>
              <LocalFrom
                title="レギュラー"
                nameKey="fuelRegular"
                span="円"
                formUtils={formUtils}
              />
              <LocalFrom
                title="ハイオク"
                nameKey="fuelPremium"
                span="円"
                formUtils={formUtils}
              />
              <LocalFrom
                title="軽油"
                nameKey="fuelDiesel"
                span="円"
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
