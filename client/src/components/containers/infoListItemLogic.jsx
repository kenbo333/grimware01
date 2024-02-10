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

  const lookupSelect = (e, ...fieldNames) => {
    //optionにdata-value[index]と設定 indexはfieldNamesの配列
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const selectedOption = e.target.selectedOptions[0].dataset;
    const newItems = [...items];
    newItems[index][name] = value;
    fieldNames.forEach((fieldName, i) => {
      newItems[index][fieldName] = selectedOption[`value${i}`];
    });
    setItems(newItems);
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
    lookupSelect,
    lookupCheckbox,
  };
};

export default useInfoListItemLogic;
