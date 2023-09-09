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
        const response = await apiClient.get("/remark", {
          params: {
            fk_car: querySel,
          },
        });
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [querySel]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  return (
    <div>
      <div
        className="mb-3"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: "2px dashed gray",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: isDragOver ? "#f3f4f6" : "white",
        }}
      >
        {isDragOver ? "Release to drop" : "Drag & Drop ここへ"}
      </div>

      <div>
        {items.map((item) => (
          <div key={item.id} className="my-2">
            <input
              type="text"
              className="form-control"
              name="fileName"
              value={item.fileName || ""}
              onChange={handleChange}
            />
            <input
              type="text"
              className="form-control"
              name="remark"
              value={item.remark || ""}
              onChange={handleChange}
            />
            {item.mimeType.startsWith("image/") ? (
              <img
                src={item.data}
                alt={item.name}
                style={imageStyle}
                onClick={handleImageClick}
              />
            ) : (
              <a href={item.data} download={item.name}>
                Download {item.name}
              </a>
            )}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabRemark;
