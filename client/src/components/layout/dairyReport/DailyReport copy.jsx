import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";

const DailyReport = (props) => {
  const { sel } = props;
  const [items, setItems] = useState([]);
  const [companies, setCompanies] = useState([]);

  //ポータルレコード作成
  const handlePortalAdd = async () => {
    try {
      const newItem = await apiClient.post(`/dailies/${sel}/dailyReports`, {
        fk_daily: sel,
      });
      setItems([...items, newItem.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, itemId) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, fk_company: e.target.value } : item
    );
    setItems(newItems);
  };

  const handleSave = async (id) => {
    try {
      const newItem = await apiClient.put(
        `/dailies/${sel}/dailyReports/${id}`,
        {
          fk_daily: sel,
        }
      );
      setItems([...items, newItem.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {};

  // 会社データの取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get("/companies?isPrime=true");
        setCompanies(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // ポータル取得
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/dailies/${sel}/dailyReports`);
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sel]);

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-2 mb-2"
        onClick={() => handlePortalAdd(sel)}
      >
        レコード作成
      </button>

      <div>
        {items.map((item) => (
          <div key={item.id} className="row mb-1">
            <div className="col-4">
              <select
                className="form-select form-select-sm"
                value={item.fk_company || ""}
                onChange={(e) => handleChange(e, item.id)}
              >
                {!item.fk_company && <option value=""></option>}
                {companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="col">
              <button
                type="btn"
                className="btn btn-secondary btn-sm me-1"
                onClick={() => handleSave(item.id)}
              >
                保存
              </button>
              <button
                type="btn"
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
              >
                削除
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />
      {/* <button type="btn" className=" btn btn-secondary" onClick={handleSave}>
        保存
      </button> */}
    </div>
  );
};

export default DailyReport;
