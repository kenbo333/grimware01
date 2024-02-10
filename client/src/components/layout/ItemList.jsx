import { usePathManager } from "@/components/containers/handleItem";
import { useState } from "react";

export const ItemList = (props) => {
  const { items, type, sel } = props;
  if (!items) return;

  const { pathChange } = usePathManager();

  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterStrategies = {
    company: (item) => item.name.includes(searchText),
    branch: (item) => item.name.includes(searchText),
    employee: (item) =>
      item.lastName.includes(searchText) || item.firstName.includes(searchText),
    car: (item) => item.name.includes(searchText),
    project: (item) => item.name.includes(searchText),
    monthlyReport: (item) => item.closingDate.includes(searchText),
  };

  const titleStrategies = {
    company: ["name"],
    branch: ["name"],
    employee: ["lastName", "firstName"],
    car: ["name"],
    project: ["projectNumber", "name"],
    monthlyReport: ["closingDate"],
  };

  const filteredItems = items.filter(filterStrategies[type]);
  const titles = titleStrategies[type];

  return (
    <div>
      {/* 検索窓 */}
      <div className="my-2 position-relative">
        <input
          type="text"
          name="searchText"
          autoFocus
          placeholder="検索"
          value={searchText}
          onChange={handleChange}
          className="form-control"
        />
        {searchText && (
          <div className="input-group-append">
            <span
              className="position-absolute text-secondary"
              style={{
                top: "50%",
                right: "10px",
                transform: "translateY(-55%)",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
              onClick={() => setSearchText("")}
            >
              ×
            </span>
          </div>
        )}
      </div>

      {/* リスト */}
      <div className="overflow-auto" style={{ height: "750px" }}>
        <div className="list-group">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`list-group-item ${sel === item.id ? "active" : ""}`}
              onClick={() => pathChange(item.id, true)}
              style={{ minHeight: "40px" }}
            >
              {titles.map((title) => `${item[title]} `)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
