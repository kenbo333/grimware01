import { useRouter } from "next/router";
import apiClient from "../../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

//パスの管理
export const usePathManager = () => {
  const router = useRouter();
  const pathChange = async (id, isShallow) => {
    //falseでSSRの再レンダリング
    await router.replace(
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
      await apiClient.put(url, formData);
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error(error);
      throw error;
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

  const updateCheckbox = useCallback((key) => {
    setFormData((prevData) => ({ ...prevData, [key]: !prevData[key] }));
  }, []);

  const updateCheckedItemsArray = (list, key) => {
    if (formData[key].includes(list)) {
      // 既にチェックされている場合は、配列から削除
      setFormData((prevData) => ({
        ...prevData,
        [key]: prevData[key].filter((item) => item !== list),
      }));
    } else {
      // チェックされていない場合は、配列に追加
      setFormData((prevData) => ({
        ...prevData,
        [key]: [...prevData[key], list],
      }));
    }
  };

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
    updateCheckedItemsArray,
    startEdit,
    cancelEdit,
    endEdit,
  };
};
