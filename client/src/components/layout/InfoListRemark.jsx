import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";
import { toast } from "react-toastify";

const InfoListRemark = (props) => {
  const { fkName, sel } = props;
  const [items, setItems] = useState([]);

  const handleCreate = async () => {
    try {
      const response = await apiClient.post("/remarks", {
        postData: {
          [fkName]: sel,
        },
      });
      const newItem = response.data;
      setItems((prevItems) => [newItem, ...prevItems]);
      console.log(`create:${newItem.id}`);
    } catch (error) {
      console.error("Error creating a new maintenance record:", error);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    try {
      await apiClient.delete(`/remarks/${items[index].id}`);
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
      toast.warn("削除しました");
    } catch (error) {
      toast.error("deleteError");
      console.error("Error deleting the item:", error);
    }
  };

  const handleFileDrop = async (e, index) => {
    e.preventDefault();
    try {
      const newItems = [...items];
      const droppedFile = e.dataTransfer.files[0];
      const today = new Date();
      const formattedDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

      newItems[index].fileName = droppedFile.name;
      newItems[index].date = formattedDate;

      const formData = new FormData();
      formData.append("file", droppedFile);
      formData.append("updateData", JSON.stringify(newItems[index]));

      await apiClient.put(`/remarks/${items[index].id}`, formData);
      setItems(newItems);
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error(error);
    }
  };

  const handleCheck = async (e) => {
    try {
      const index = parseInt(e.target.dataset.index, 10);
      const { name } = e.target;
      const newItems = [...items];
      newItems[index][name] = !newItems[index][name];
      const formData = { updateData: JSON.stringify(newItems[index]) };

      await apiClient.put(`/remarks/${items[index].id}`, formData);
      setItems(newItems);
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error("Failed to update:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/remarks", {
          params: {
            [fkName]: sel,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sel]);

  return (
    <div className="tab-pane active my-3">
      <div>
        <button
          type="button"
          className="btn btn-success"
          onClick={handleCreate}
        >
          新規作成
        </button>
        <div className="row h6">
          <div className="col-4">ファイル名</div>
          <div className="col-2">公開</div>
          <div className="col-3">アップロード日</div>
        </div>
      </div>

      <hr />

      <div>
        {items.map((item, index) => (
          <div key={item.id}>
            <div className="row">
              <div className="col-4">
                {!item.fileName ? (
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleFileDrop(e, index)}
                    style={{
                      border: "2px dashed #ccc",
                      padding: "4px",
                      textAlign: "center",
                    }}
                  >
                    ドラッグ&ドロップ
                  </div>
                ) : (
                  <a
                    href={`http://localhost:5000/api/remarks/download/${item.id}`}
                    target={
                      ["image/jpeg", "image/png", "application/pdf"].includes(
                        item.fileType
                      )
                        ? "_blank"
                        : ""
                    }
                  >
                    {item.fileName}
                  </a>
                )}
              </div>

              <div className="col-2">
                {/* <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={`isPublic-${index}`}
                    name="isPublic"
                    checked={item.isPublic || false}
                    onChange={(e) => handleCheck(e, index)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`isPublic-${index}`}
                  >
                    公開
                  </label>
                </div> */}
                <div className="form-check">
                  <label
                    className="form-check-label"
                    // htmlFor={`isPublic-${index}`}
                  >
                    <input
                      type="checkbox"
                      className="form-check-input"
                      // id={`isPublic-${index}`}
                      data-index={index.toString()}
                      name="isPublic"
                      checked={item.isPublic || false}
                      onChange={handleCheck}
                    />
                    公開
                  </label>
                </div>
              </div>

              <div className="col-3">{item.date}</div>

              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  削除
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoListRemark;
