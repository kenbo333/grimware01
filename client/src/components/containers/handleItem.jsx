import { useRouter } from "next/router";
import apiClient from "../../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

//パスの管理
export const usePathManager = () => {
  const router = useRouter();
  const pathChange = (id, isShallow) => {
    //falseでSSRの再レンダリング
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, sel: id },
      },
      undefined,
      { shallow: isShallow }
    );
  };

  const pathMove = (isStatic, items, sel) => {
    if (isStatic) {
      pathChange(sel, false);
    } else {
      const index = items.findIndex((item) => item.id === sel);
      pathChange(index ? items[index - 1].id : "", false);
    }
  };

  return { pathChange, pathMove };
};

//データベースに保存
export const useSaveData = () => {
  const saveData = useCallback(async (url, formData) => {
    try {
      await apiClient.put(url, { formData });
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error(error);
    }
  }, []);

  return { saveData };
};

//フォームデータの管理
export const useFormEditor = (initialData) => {
  const [formData, setFormData] = useState(initialData);

  const updateObject = useCallback((key, newValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: newValue,
    }));
  }, []);

  const updateCheckbox = useCallback((id) => {
    setFormData((prevData) => ({ ...prevData, [id]: !prevData[id] }));
  }, []);

  const startEdit = () => {
    const newFormData = { ...formData };
    newFormData.isEditing = true;
    newFormData.originalData = { ...newFormData };
    setFormData(newFormData);
  };

  const cancelEdit = () => {
    const newFormData = { ...formData.originalData };
    delete newFormData.isEditing;
    delete newFormData.originalData;
    setFormData(newFormData);
  };

  const endEdit = () => {
    const newFormData = { ...formData };
    delete newFormData.isEditing;
    delete newFormData.originalData;
    setFormData(newFormData);
    return newFormData;
  };

  useEffect(() => {
    setFormData({ ...initialData });
  }, [JSON.stringify(initialData)]);

  return {
    formData,
    updateObject,
    updateCheckbox,
    startEdit,
    cancelEdit,
    endEdit,
  };
};
