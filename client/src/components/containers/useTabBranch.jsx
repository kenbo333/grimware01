import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormEditor, usePathManager, useSaveData } from "./handleItem";
import apiClient from "../../../lib/apiClient";

export const useTabBranch = (type, branches, isCreateState) => {
  const router = useRouter();
  const { sel, companyId } = router.query;
  const branch = branches.find((item) => item.id === sel);
  const emps = branch.companyEmployee;
  const [activeTab, setActiveTab] = useState("詳細");

  //オブジェクトから配列を除去
  const { companyEmployee, ...initialData } = branch;
  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit } = formUtils;

  //formData保存して更新
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      await saveData(`/companies/${companyId}/branches/${sel}`, newFormData);
      // statusが不変かどうかのチェック
      const isStatic = branch.isStatus === formData.isStatus;
      pathMove(isStatic, branches, sel);
    } catch (error) {
      console.error(error);
    }
  };

  //社員作成
  const handleCreate = async () => {
    try {
      const response = await apiClient.post(
        `/companies/${companyId}/branches/${sel}/employees`,
        {
          fk_companyId: branch.fk_companyId,
          fk_companyBranchId: branch.id,
        }
      );
      const { id: newEmployeeId } = response.data;
      sessionStorage.setItem("sessionIsCreate", "true");
      router.push({
        pathname: `/${type}/${companyId}/branches/${branch.id}`,
        query: { sel: newEmployeeId },
      });
      console.log(`create:${newEmployeeId}`);
    } catch (error) {
      console.error(error);
    }
  };

  //編集モード
  useEffect(() => {
    isCreateState.isCreate &&
      (formUtils.startEdit(),
      isCreateState.setIsCreate(false),
      sessionStorage.removeItem("sessionIsCreate"));
  }, [isCreateState.isCreate]);

  return {
    activeTab,
    setActiveTab,
    branch,
    emps,
    formUtils,
    handleSave,
    handleCreate,
    companyId,
    sel,
  };
};
