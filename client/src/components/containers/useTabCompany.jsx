import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";
import { useFormEditor, usePathManager, useSaveData } from "./handleItem";

const TYPE_MAPPING = {
  prime: {
    checkStatic: (company, formData) => company.isPrime === formData.isPrime,
    routePath: (company) => `/primes/${company.id}/branches`,
  },
  sub: {
    checkStatic: (company, formData) => company.isSub === formData.isSub,
    routePath: (company) => `/subs/${company.id}/branches`,
  },
  purchase: {
    checkStatic: (company, formData) =>
      company.isPurchase === formData.isPurchase,
    routePath: (company) => `/purchases/${company.id}/branches`,
  },
};

export const useTabCompany = (companies, isCreateState, companyType) => {
  const router = useRouter();
  const { sel } = router.query;
  const company = companies.find((item) => item.id === sel);
  const branches = company.companyBranch;
  const emps = company.companyEmployee;

  //オブジェクトから配列を除去
  const { companyBranch, companyEmployee, ...initialData } = company;

  const [activeTab, setActiveTab] = useState("詳細");

  //inputの表示とオブジェクトの更新
  const formUtils = useFormEditor(initialData);
  const { formData, endEdit, startEdit } = formUtils;

  //formDataをupdate
  const { saveData } = useSaveData();
  const { pathMove } = usePathManager();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      await saveData(`/companies/${sel}`, newFormData);
      const isStaticType = TYPE_MAPPING[companyType].checkStatic(
        company,
        formData
      );
      const isStatic = isStaticType && company.isStatus === formData.isStatus;
      pathMove(isStatic, companies, sel);
    } catch (error) {
      console.error(error);
    }
  };

  //店社作成
  const handleCreate = async () => {
    try {
      const response = await apiClient.post(
        `/companies/${company.id}/branches`,
        { fk_companyId: sel }
      );
      const { id: newBranchId } = response.data;
      sessionStorage.setItem("sessionIsCreate", "true");
      const routePath = TYPE_MAPPING[companyType].routePath(company);
      router.push({ pathname: routePath, query: { sel: newBranchId } });
      console.log(`create:${newBranchId}`);
    } catch (error) {
      console.error(error);
    }
  };

  //編集モード
  useEffect(() => {
    isCreateState.isCreate && (startEdit(), isCreateState.setIsCreate(false));
  }, [isCreateState.isCreate]);

  return {
    activeTab,
    setActiveTab,
    company,
    formUtils,
    handleSave,
    handleCreate,
    branches,
    emps,
  };
};
