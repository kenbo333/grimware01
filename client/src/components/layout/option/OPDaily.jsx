import {
  useFormEditor,
  usePathManager,
  useSaveData,
} from "@/components/containers/handleItem";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import React from "react";

const OPDaily = (props) => {
  const { sel } = props;
  const { projType1, projType2, ...other } = props.option;

  const formUtils = useFormEditor(other);
  const { formData } = formUtils;

  const handleChange = (event) => {
    const { id, name, value } = event.target;
    const index = parseInt(id.split("-")[1], 10);
    const updatedArray = [...formData[name]];
    updatedArray[index] = value;

    formUtils.updateObject(name, updatedArray);
  };

  const { saveData } = useSaveData();
  const { pathChange } = usePathManager();
  const handleSave = async () => {
    const updateData = formUtils.endEdit();
    await saveData("/options/1", updateData);
    await pathChange(sel, false);
  };

  const handleAddInput = (reportType) => {
    formUtils.updateObject(reportType, [...formData[reportType], ""]);
  };

  const handleRemoveInput = (reportType, index) => {
    const updatedReport = formData[reportType].filter((_, i) => i !== index);
    formUtils.updateObject(reportType, updatedReport);
  };

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <div className="fs-5 fw-bold text-center">日報オプション1</div>
            {formData.isEditing && (
              <div className="ms-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddInput("dailyReport1")}
                >
                  追加
                </button>
              </div>
            )}
          </div>
          {formData.dailyReport1.map((item, i) => (
            <div key={i} className="mb-3 d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id={`dailyReport1-${i}`}
                name="dailyReport1"
                value={item}
                onChange={handleChange}
                disabled={!formData.isEditing}
              />
              {formData.isEditing && (
                <button
                  type="button"
                  className="btn btn btn-outline-danger btn-sm ms-2"
                  onClick={() => handleRemoveInput("dailyReport1", i)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="col-6">
          <div className="mb-3 d-flex justify-content-center align-items-center">
            <div className="fs-5 fw-bold text-center">日報オプション2</div>
            {formData.isEditing && (
              <div className="ms-3">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handleAddInput("dailyReport2")}
                >
                  追加
                </button>
              </div>
            )}
          </div>
          {formData.dailyReport2.map((item, i) => (
            <div key={i} className="mb-3 d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                id={`dailyReport2-${i}`}
                name="dailyReport2"
                value={item}
                onChange={handleChange}
                disabled={!formData.isEditing}
              />
              {formData.isEditing && (
                <button
                  type="button"
                  className="btn btn btn-outline-danger btn-sm ms-2"
                  onClick={() => handleRemoveInput("dailyReport2", i)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <hr />
        <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
      </div>
    </div>
  );
};

export default OPDaily;
