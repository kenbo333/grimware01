import { usePathChange } from "@/components/containers/handleItem";
import { useState } from "react";

export const ItemList = (props) => {
  const { items, type, sel } = props;
  const { pathChange } = usePathChange();

  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const filterStrategies = {
    company: (item) => item.companyName.includes(searchText),
    branch: (item) => item.branchName.includes(searchText),
    employee: (item) =>
      item.lastName.includes(searchText) || item.firstName.includes(searchText),
    car: (item) => item.carName.includes(searchText),
  };

  const titleStrategies = {
    company: ["companyName"],
    branch: ["branchName"],
    employee: ["lastName", "firstName"],
    car: ["carName"],
  };

  const filteredItems = items.filter(filterStrategies[type]);
  const titles = titleStrategies[type];

  return (
    <>
      {/* 検索窓 */}
      <div className="my-2">
        <input
          type="text"
          name="searchText"
          autoFocus
          placeholder="検索"
          value={searchText}
          onChange={handleChange}
          className="form-control"
        />
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
            >
              {titles.map((title) => `${item[title]} `)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
