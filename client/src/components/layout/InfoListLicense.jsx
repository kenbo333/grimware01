import React, { useEffect, useState } from "react";
import apiClient from "../../../lib/apiClient";
import { toast } from "react-toastify";

const InfoListLicense = (props) => {
  const { sel } = props;
  const [items, setItems] = useState([]);

  const handleCreate = async () => {
    try {
      const response = await apiClient.post(
        `/companyEmployees/${sel}/employeeLicenses`,
        {
          postData: {
            fk_companyEmployeeId: sel,
          },
        }
      );
      const newItem = response.data;
      setItems((prevItems) => [newItem, ...prevItems]);
      console.log(`create:${newItem.id}`);
    } catch (error) {
      console.error("Error creating a new employeeLicense record:", error);
    }
  };

  const handleDelete = async (index) => {
    if (!window.confirm("削除してもよろしいですか？")) return;

    try {
      await apiClient.delete(
        `/companyEmployees/${sel}/employeeLicenses/${items[index].id}`
      );
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
      // newItems[index].date = formattedDate;

      const formData = new FormData();
      formData.append("file", droppedFile);
      formData.append("updateData", JSON.stringify(newItems[index]));

      await apiClient.put(
        `/companyEmployees/${sel}/employeeLicenses/${items[index].id}`,
        formData
      );
      setItems(newItems);
      toast.success("保存しました");
    } catch (error) {
      toast.error("saveError");
      console.error(error);
    }
  };

  const handleCheck = async (e, index) => {
    try {
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

  const handleChange = (e) => {
    const index = parseInt(e.target.dataset.index, 10);
    const { name, value } = e.target;
    const newItems = [...items];
    newItems[index][name] = value;
    setItems(newItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `/companyEmployees/${sel}/employeeLicenses`
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
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
          <div className="col-4">資格名</div>
          <div className="col-2">取得日</div>
          <div className="col-3">有効期限日</div>
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
                    href={`http://localhost:5000/api/companyEmployees/download/${item.id}`}
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

              <div className="col-3 p-0">
                <input
                  type="date"
                  className="form-control"
                  name="acquisitionDate"
                  placeholder="取得日"
                />
              </div>
              <div className="col-3 p-0">
                <input
                  type="date"
                  className="form-control"
                  name="expiryDate"
                  placeholder="有効期限日"
                />
              </div>

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

            <div className="row">
              <div className="col-sm-6 pe-0">
                <input
                  className="form-control"
                  name="issuingAuthority"
                  value={items[index].issuingAuthority}
                  onChange={handleChange}
                  placeholder="発行機関"
                  data-index={index.toString()}
                  // disabled={!formData.isEditing}
                />
              </div>
              <div className="col-sm-6 ps-0">
                <input
                  type="text"
                  className="form-control"
                  name="licenseNumber"
                  placeholder="番号"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3 pe-0">
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  placeholder="分類"
                />
              </div>
              <div className="col-sm-9 ps-0">
                <input
                  type="text"
                  className="form-control"
                  name="remark"
                  placeholder="備考"
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoListLicense;
