import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";

const TabRemark = (props) => {
  const { querySel } = props;
  const [items, setItems] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const formData = new FormData();
    formData.append("file", e.dataTransfer.files[0]);
    formData.append("fk_car", querySel);

    try {
      const response = await apiClient.post("/remark", formData);
      console.log("File uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };
  const imageStyle = isZoomed
    ? { width: "100%", height: "auto" }
    : { width: "100px", height: "auto", cursor: "pointer" };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/remarks", {
          params: {
            fk_car: querySel,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [querySel]);

  const handleChange = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  const handleCreate = async () => {
    try {
      const response = await apiClient.post("/remarks", {
        postData: {
          fk_car: querySel,
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
      const newItems = [...items];
      // delete newItems[index].isEditing;
      // delete newItems[index].originalItem;
      const updatedData = newItems[index];
      await apiClient.put("/remarks", { updatedData });
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
              <div
                className="col-2"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  border: "2px dashed gray",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  background: isDragOver ? "#f3f4f6" : "white",
                }}
              >
                {isDragOver ? "Release to drop" : "Drag & Drop ここへ"}
              </div>

              <div className="col-10">
                <div className="row">
                  <div className="col-8 px-1">
                    <input
                      type="text"
                      className="form-control"
                      name="fileName"
                      data-index={index.toString()}
                      value={item.fileName || ""}
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
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-4 px-1">
                    <button type="button" className="btn btn-light">
                      🔎
                    </button>
                    <button type="button" className="btn btn-light">
                      DL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn btn-success me-3"
                onClick={() => handleSave(index)}
              >
                保存
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(index)}
              >
                削除
              </button>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>

    // <div>

    //   <div>
    //     {items.map((item) => (
    //       <div key={item.id} className="my-2">
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="fileName"
    //           value={item.fileName || ""}
    //           onChange={handleChange}
    //         />
    //         <input
    //           type="text"
    //           className="form-control"
    //           name="remark"
    //           value={item.remark || ""}
    //           onChange={handleChange}
    //         />
    //         {item.mimeType.startsWith("image/") ? (
    //           <img
    //             src={item.data}
    //             alt={item.name}
    //             style={imageStyle}
    //             onClick={handleImageClick}
    //           />
    //         ) : (
    //           <a href={item.data} download={item.name}>
    //             Download {item.name}
    //           </a>
    //         )}
    //         <hr />
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default TabRemark;
