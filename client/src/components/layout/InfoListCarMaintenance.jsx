import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";

const InfoListCarMaintenance = (props) => {
  // console.log(props.carMaintenance);
  const { carMaintenance, carId } = props;
  const [items, setItems] = useState(carMaintenance);

  const handleCreate = async () => {
    try {
      const response = await apiClient.post("/car/maintenance", {
        carId,
      });
      const newItem = response.data;
      setItems((prevItems) => [...prevItems, newItem]);
    } catch (error) {
      console.error("Error creating a new maintenance record:", error);
    }
  };
  const handleEdit = (index) => {
    const newItems = [...items];
    newItems[index].isEditing = true;
    newItems[index].originalItem = { ...newItems[index] }; // 編集前の状態を保存
    setItems(newItems);
  };

  const handleChange = (e) => {
    const index = parseInt(e.target.getAttribute("data-index"), 10);
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleSave = async (index) => {
    try {
      const newItems = [...items];
      delete newItems[index].isEditing;
      delete newItems[index].originalItem;
      const updatedData = newItems[index];
      await apiClient.put("/car/maintenance", { updatedData });
      setItems(newItems);
    } catch (error) {
      console.error("Error saving the item:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await apiClient.delete(`/car/maintenance/${items[index].id}`);
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleCancel = (index) => {
    const newItems = [...items];
    const originalItem = newItems[index].originalItem;
    newItems[index] = originalItem;
    delete newItems[index].isEditing;
    delete newItems[index].originalItem;
    setItems(newItems);
  };

  //車両リスト変更で更新
  useEffect(() => {
    setItems(carMaintenance);
  }, [carMaintenance]);

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
                    value={item.date || ""}
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
    </div>
  );
};

export default InfoListCarMaintenance;
