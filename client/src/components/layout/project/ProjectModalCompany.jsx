import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";

const ProjectModalCompany = (props) => {
  const { isModalOpenState, sel } = props;
  const { isModalOpen, setIsModalOpen } = isModalOpenState;
  const [items, setItems] = useState([]);

  const [selectedCompanyIds, setSelectedCompanyIds] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCompanyIds((prevIds) => {
      if (checked) {
        return [...prevIds, value];
      } else {
        return prevIds.filter((id) => id !== value);
      }
    });
  };

  const handleSave = async () => {
    try {
      await apiClient.delete(`/projectCompanies/purchases/${sel}`);
      await apiClient.post("/projectCompanies/bulk", {
        companyIds: selectedCompanyIds,
        fk_project: sel,
      });
      setIsModalOpen(false);
      setSelectedCompanyIds([]); // 選択状態をリセット
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/companies?isPurchase=true");
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCompaniesForProject = async () => {
      try {
        const response = await apiClient.get(
          `/projectCompanies/purchases/${sel}`
        );
        const companyIds = response.data.map((item) => item.fk_companyId);
        setSelectedCompanyIds(companyIds);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    fetchCompaniesForProject();
  }, []);

  return (
    <>
      <div
        className={`modal ${isModalOpen ? "d-block show" : ""}`}
        tabIndex="-1"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">取引する仕入会社</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>

            <div className="modal-body">
              <ul className="list-group">
                {items.map((item) => (
                  <li key={item.id} className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      id={`checkbox-${item.id}`}
                      value={item.id}
                      onChange={handleCheckboxChange}
                      checked={selectedCompanyIds.includes(item.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${item.id}`}
                    >
                      {item.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className={`modal-backdrop ${isModalOpen ? "show" : ""}`}></div>
      )}
    </>
  );
};

export default ProjectModalCompany;
