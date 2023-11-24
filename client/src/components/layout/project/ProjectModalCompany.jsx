import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";

const ProjectModalCompany = (props) => {
  const { modalOpenState, sel, ids } = props;
  const { modalOpen, setModalOpen } = modalOpenState;
  const [items, setItems] = useState([]);
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(ids);

  const apiConfig = {
    purchase: { endpoint: "purchases", queryParam: "isPurchase=true" },
    sub: { endpoint: "subs", queryParam: "isSub=true" },
  };
  const { endpoint, queryParam } = apiConfig[modalOpen];

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCompanyIds((prevIds) =>
      checked ? [...prevIds, value] : prevIds.filter((id) => id !== value)
    );
  };

  const handleSave = async () => {
    try {
      await apiClient.delete(`/projectCompanies/${endpoint}/${sel}`);
      await apiClient.post(`/projectCompanies/${endpoint}/bulk`, {
        companyIds: selectedCompanyIds,
        fk_projectId: sel,
      });
      setModalOpen("edit");
    } catch (error) {
      console.error(error);
    }
  };

  //チェック用 会社リスト取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/companies?${queryParam}`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className={`modal ${modalOpen ? "d-block show" : ""}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">取引する仕入会社</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalOpen("")}
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
      {modalOpen && (
        <div className={`modal-backdrop ${modalOpen ? "show" : ""}`}></div>
      )}
    </>
  );
};

export default ProjectModalCompany;
