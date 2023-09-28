import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";

const InfoListCarMaintenance = (props) => {
  const { sel } = props;
  const [items, setItems] = useState([]);

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

  const handleCreate = async () => {
    try {
      const response = await apiClient.post(`/cars/${sel}/maintenance`);
      const newItem = response.data;
      setItems((prevItems) => [newItem, ...prevItems]);
      console.log(`create:${newItem.id}`);
    } catch (error) {
      console.error("Error creating a new maintenance record:", error);
    }
  };

  const handleSave = async (index) => {
    try {
      const newItems = [...items];
      delete newItems[index].isEditing;
      delete newItems[index].originalItem;
      const updateData = newItems[index];
      await apiClient.put(`/cars/${sel}/maintenance/${items[index].id}`, {
        updateData,
      });
      setItems(newItems);
      console.log("saved");
    } catch (error) {
      console.error("Error saving the item:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await apiClient.delete(`/cars/${sel}/maintenance/${items[index].id}`);
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      console.log("delete");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await apiClient.get(`/cars/${sel}/maintenance`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, [sel]);

  return (
    <div>
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        <div className="row h6">
          <div className="col-3">日付/備考</div>
          <div className="col-3">内容</div>
          <div className="col-3">距離</div>
          <div className="col-3">金額</div>
        </div>
      </div>

      <hr />

      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row">
              <div className="col-3 pe-1">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  data-index={index.toString()}
                  value={item.date}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="content"
                  data-index={index.toString()}
                  value={item.content}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 px-1">
                <input
                  type="text"
                  className="form-control"
                  name="odometer"
                  data-index={index.toString()}
                  value={item.odometer}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
              <div className="col-3 ps-1">
                <input
                  type="text"
                  className="form-control"
                  name="cost"
                  data-index={index.toString()}
                  value={item.cost}
                  disabled={!item.isEditing}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!item.isEditing ? (
              <div>
                <button
                  type="button"
                  className="btn btn-info me-4"
                  onClick={() => handleEdit(index)}
                >
                  編集
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  削除
                </button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-success me-4"
                  onClick={() => handleSave(index)}
                >
                  保存
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleCancel(index)}
                >
                  キャンセル
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoListCarMaintenance;
