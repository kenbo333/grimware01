import { useRouter } from "next/router";
import apiClient from "../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";

//パスの変更
export const usePathChange = () => {
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

  return { pathChange };
};

//データベースに保存
export const useSaveData = (formData) => {
  const router = useRouter();
  const saveData = useCallback(async () => {
    try {
      await apiClient.put(router.asPath, { formData });
      console.log("saved");
    } catch (err) {
      console.error(err);
    }
  }, [router, formData]);

  return { saveData };
};

//inputの表示とオブジェクトの更新
export const useFormUpdate = (initialData) => {
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

  useEffect(() => {
    setFormData({ ...initialData });
  }, [JSON.stringify(initialData)]);

  return { formData, updateObject, updateCheckbox };
};
