import { useFormEditor, useSaveData } from "@/components/containers/handleItem";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import React, { useState } from "react";

const lists = [
  "仕入高",
  "外注費",
  "消耗品費",
  "事務用品費",
  "地代家賃",
  "賃借料",
  "保険料",
  "修繕費",
  "減価償却費",
  "旅費交通費",
  "通信費",
  "水道光熱費",
  "支払手数料",
  "荷造包装費",
  "運賃",
  "広告宣伝費",
  "接待交際費",
  "会議費",
  "新聞図書費",
  "雑費",
  "支払利息割引料",
  "雑損失",
  "福利厚生費",
];

const OPExpense = (props) => {
  // const option = props.option;
  const { projType1, projType2, ...other } = props.option;

  const formUtils = useFormEditor(other);
  const { formData, updateCheckedItemsArray } = formUtils;

  const { saveData } = useSaveData();
  const handleSave = async () => {
    const updateData = formUtils.endEdit();
    await saveData("/option/1", updateData);
  };

  return (
    <div>
      {lists.map((list) => (
        <div className="form-check" key={list}>
          <input
            className="form-check-input"
            type="checkbox"
            id={list}
            checked={formData.expenseAccount.includes(list)}
            onChange={() => updateCheckedItemsArray(list, "expenseAccount")}
            disabled={!formData.isEditing}
          />
          <label className="form-check-label" htmlFor={list}>
            {list}
          </label>
        </div>
      ))}

      <hr />

      <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
    </div>
  );
};

export default OPExpense;
