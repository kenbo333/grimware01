import { usePathChange } from "@/utils/handle";
import { useState } from "react";

export const ItemList = ({ items, type, querySel }) => {
  const { pathChange } = usePathChange();
  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  let titles = [];
  let filteredItems;
  switch (type) {
    case "company":
      titles = ["companyName"];
      filteredItems = items?.filter((item) =>
        item.companyName?.includes(searchText)
      );
      break;

    case "branch":
      titles = ["branchName"];
      filteredItems = items?.filter((item) =>
        item.branchName?.includes(searchText)
      );
      break;

    case "employee":
      titles = ["lastName", "firstName"];
      filteredItems = items?.filter(
        (item) =>
          item.lastName.includes(searchText) ||
          item.firstName.includes(searchText)
      );
      break;
  }

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

      {/* 会社リスト */}
      <div className="overflow-auto" style={{ height: "750px" }}>
        <div className="list-group">
          {filteredItems?.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`list-group-item ${
                querySel === item.id ? "active" : ""
              }`}
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
