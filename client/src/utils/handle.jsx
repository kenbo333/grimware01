import { useRouter } from "next/router";
import apiClient from "../../lib/apiClient";
import { useCallback, useEffect, useState } from "react";

//パスの変更
export const usePathChange = () => {
  const router = useRouter();

  const pathChange = (id) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, sel: id },
    });
  };

  return pathChange;
};

//データベースに保存
export const useSaveData = (formData) => {
  const router = useRouter();

  const saveData = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await apiClient.put(router.asPath, { formData });
        alert("save");
      } catch (err) {
        console.log(err);
      }
    },
    [router, formData]
  );

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
