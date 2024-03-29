import React, { useState } from "react";
import { apiClient } from "../../../../lib/apiClient";
import { useFetchSingle } from "@/components/containers/useFetchData";

const apiConfig = {
  purchase: {
    endpoint: "purchases",
    queryParam: "&isPurchase=true",
    title: "取引する仕入会社",
  },
  sub: {
    endpoint: "subs",
    queryParam: "&isSub=true",
    title: "入場する下請会社",
  },
};

const ProjectCompanyModal = (props) => {
  const { modalOpenState, sel, ids } = props;
  const { modalOpen, setModalOpen } = modalOpenState;
  const [selectedCompanyIds, setSelectedCompanyIds] = useState(ids);

  const { endpoint, queryParam, title } = apiConfig[modalOpen];

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
  const {
    data: companies,
    error,
    isLoading,
  } = useFetchSingle(`/companies?isStatus=true&isOwn=false${queryParam}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div>
      <div className="modal d-block show" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setModalOpen("")}
              ></button>
            </div>

            <div className="modal-body">
              <ul className="list-group">
                {companies.map((company) => (
                  <li key={company.id} className="list-group-item">
                    <input
                      className="form-check-input me-1"
                      type="checkbox"
                      id={`checkbox-${company.id}`}
                      value={company.id}
                      onChange={handleCheckboxChange}
                      checked={selectedCompanyIds.includes(company.id)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`checkbox-${company.id}`}
                    >
                      {company.name}
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
      <div className="modal-backdrop show"></div>
    </div>
  );
};

export default ProjectCompanyModal;
