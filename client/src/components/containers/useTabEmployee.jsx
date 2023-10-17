import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormEditor, usePathManager, useSaveData } from "./handleItem";

export const useTabEmployee = (emps, isCreateState) => {
  const router = useRouter();
  const { sel, companyId, branchId } = router.query;
  const emp = emps.find((item) => item.id === sel);

  const [activeTab, setActiveTab] = useState("詳細");

  //オブジェクトから配列を除去
  const { ...initialData } = emp;

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = () => {
    const newFormData = endEdit();
    saveData(
      `/companies/${companyId}/branches/${branchId}/employees/${sel}`,
      newFormData
    );
    //所属とstatusが不変時
    const isStatic =
      emp.fk_companyBranchId === formData.fk_companyBranchId &&
      emp.isStatus === formData.isStatus;
    pathMove(isStatic, emps, sel);
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    formUtils.updateObject(id, value);
  };

  //編集モード
  useEffect(() => {
    isCreateState.isCreate &&
      (startEdit(),
      isCreateState.setIsCreate(false),
      sessionStorage.removeItem("sessionIsCreate"));
  }, [isCreateState.isCreate]);

  return {
    activeTab,
    setActiveTab,
    emp,
    formUtils,
    handleSave,
    handleChange,
    sel,
    companyId,
    branchId,
  };
};
