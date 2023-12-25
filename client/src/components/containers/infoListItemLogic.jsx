import { useEffect, useState } from "react";
import apiClient, { API_ENDPOINTS } from "../../../lib/apiClient";
import { toast } from "react-toastify";

const useInfoListItemLogic = (sel, type) => {
  const apiUrl = API_ENDPOINTS[type].replace(":id", sel);
  const [items, setItems] = useState([]);

  const handleCreate = async () => {
    try {
      const response = await apiClient.post(apiUrl);
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
      await apiClient.put(`${apiUrl}/${items[index].id}`, { updateData });
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
      await apiClient.delete(`${apiUrl}/${items[index].id}`);
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

  const handleClick = (item, monthlyReport) => {
    const newItem = { ...item, fk_monthlyReport: monthlyReport.id };
    const itemIndex = items.findIndex((i) => i.id === item.id);
    const newItems = [...items];
    newItems[itemIndex] = { ...newItem };
    setItems(newItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(apiUrl);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [apiUrl]);

  return {
    items,
    handleCreate,
    handleSave,
    handleDelete,
    handleEdit,
    handleCancel,
    handleChange,
    handleClick,
  };
};

export default useInfoListItemLogic;
