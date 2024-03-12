import { useEffect, useState } from "react";
import { apiClient, API_ENDPOINTS } from "../../../lib/apiClient";
import { toast } from "react-toastify";

const useInfoListItemLogic = (sel, type) => {
  const { url, query, body } = API_ENDPOINTS[type];
  const [items, setItems] = useState([]);

  const handleCreate = async () => {
    try {
      const response = await apiClient.post(url, body(sel));
      const newItem = response.data;
      newItem.isEditing = true;
      newItem.originalItem = { ...newItem };
      setItems((prevItems) => [newItem, ...prevItems]);
    } catch (error) {
      toast.error("Error creating item");
      console.error(error);
    }
  };

  const handleSave = async (index) => {
    try {
      const newItems = [...items];
      delete newItems[index].isEditing;
      delete newItems[index].originalItem;
      const updateData = newItems[index];
      await apiClient.put(`${url}/${items[index].id}`, updateData);
      setItems(newItems);
      toast.success("保存しました");
    } catch (error) {
      toast.error("Error saving item");
      console.error(error);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    try {
      await apiClient.delete(`${url}/${items[index].id}`);
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      toast.warn("削除しました");
    } catch (error) {
      toast.error("Error deleting item");
      console.error(error);
    }
  };

  const handleEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = true;
    newItems[index].originalItem = { ...newItems[index] };
    setItems(newItems);
  };

  const handleCancel = (index) => {
    const newItems = [...items];
    newItems[index] = newItems[index].originalItem;
    delete newItems[index].isEditing;
    delete newItems[index].originalItem;
    setItems(newItems);
  };

  const handleChange = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleCheck = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const { name } = e.target;
    const newItems = [...items];
    newItems[index][name] = !newItems[index][name];
    setItems(newItems);
  };

  const modalSelect = (e, objKey) => {
    // 第二引数は表示しているjsonに追加させる。data-valueでセット。
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const newItems = [...items];

    newItems[index][name] = value === "" ? null : value;
    // valueが空文字("")の時はobjKeyにnullを設定し、そうでなければJSON.parseを使う
    if (value === "") {
      newItems[index][objKey] = null;
    } else if (e.target.dataset.value) {
      // dataset.valueが存在する場合、JSON.parseで解析して設定
      newItems[index][objKey] = JSON.parse(e.target.dataset.value);
      // nameが"fk_monthlyReportId"かつ、objKeyが関連する情報（例：project）を持っている場合
      if (
        name === "fk_monthlyReportId" &&
        newItems[index][objKey].project &&
        newItems[index][objKey].project.distance !== undefined
      ) {
        newItems[index].distance = newItems[index][objKey].project.distance;
      }
    }
  };

  const lookupCheckbox = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = newItems[index][name] ? null : value;
    setItems(newItems);
    console.log(newItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(url + query(sel));
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sel]);

  return {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleCheck,
    modalSelect,
    lookupCheckbox,
    modalSelect,
  };
};

export default useInfoListItemLogic;
