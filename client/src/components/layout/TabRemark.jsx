import React, { useEffect, useRef, useState } from "react";
import apiClient from "../../../lib/apiClient";

const TabRemark = (props) => {
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

  const handleCreate = async () => {
    try {
      const response = await apiClient.post("/remarks", {
        postData: {
          fk_car: sel,
        },
      });
      const newItem = response.data;
      setItems((prevItems) => [newItem, ...prevItems]);
    } catch (error) {
      console.error("Error creating a new maintenance record:", error);
    }
  };

  const handleSave = async (index) => {
    try {
      const stagedFile = items[index].file;
      const newItems = [...items];
      newItems[index] = {
        ...newItems[index],
        isFile: true,
      };
      delete newItems[index].isEditing;
      delete newItems[index].originalItem;

      const formData = new FormData();
      stagedFile &&
        (formData.append("file", stagedFile), delete newItems[index].file);
      formData.append("updateData", JSON.stringify(newItems[index]));

      await apiClient.put(`/remarks/${items[index].id}`, formData);
      setItems(newItems);
      console.log("save");
    } catch (error) {
      console.error("Error saving the item:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      await apiClient.delete(`/remarks/${items[index].id}`);
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      console.log("delete");
    } catch (error) {
      console.error("Error deleting the item:", error);
    }
  };

  const handleFileDrop = (e, index) => {
    e.preventDefault();
    const newItems = [...items];
    const droppedFile = e.dataTransfer.files[0];
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    newItems[index].file = droppedFile;
    newItems[index].fileName = droppedFile.name;
    newItems[index].date = formattedDate;
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

  const handleDownload = (index) => {
    window.location.href = `http://localhost:5000/api/remarks/download/${items[index].id}`;
  };

  const getFileStatus = (item) => {
    if (item.isFile) return "ファイル有";
    if (item.file) return "ファイルセット";
    return "ファイル無し";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/remarks", {
          params: {
            fk_car: sel,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
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
          <div className="col-3"></div>
          <div className="col-6">ファイル名/備考</div>
          <div className="col-3">日付</div>
        </div>
      </div>

      <hr />

      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row mb-3">
              <div className="col-10">
                <div className="row">
                  <div className="col-8 px-1">
                    <input
                      type="text"
                      className="form-control"
                      name="fileName"
                      data-index={index.toString()}
                      value={item.fileName || ""}
                      disabled={!item.isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4 px-1">
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
                </div>
                <div className="row">
                  <div className="col-8 px-1">
                    <input
                      type="text"
                      className="form-control"
                      name="remark"
                      data-index={index.toString()}
                      value={item.remark || ""}
                      disabled={!item.isEditing}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4 d-flex align-items-center">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={`isPublic-${index}`}
                        name="isPublic"
                        data-index={index.toString()}
                        checked={item.isPublic || false}
                        onChange={handleCheck}
                        disabled={!item.isEditing}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`isPublic-${index}`}
                      >
                        公開
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div
                className="col-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleFileDrop(e, index)}
                style={{
                  border: "2px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                }}
              >
                {getFileStatus(item)}
                <input
                  className="form-control"
                  type="file"
                  style={{ display: "none" }}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="col">
                {item.isFile && (
                  <div>
                    <button
                      type="button"
                      className="btn btn-light"
                      onClick={() => handleDownload(index)}
                    >
                      Download
                    </button>
                    <button type="button" className="btn btn-light">
                      🔎
                    </button>
                  </div>
                )}
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
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabRemark;
