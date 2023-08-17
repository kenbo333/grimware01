import { usePathChange } from "@/utils/handle";
import { useState } from "react";

export const CompanyList = ({ companies, querySel }) => {
  const { pathChange } = usePathChange();
  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredCompanies = companies?.filter((company) =>
    company.companyName?.includes(searchText)
  );

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
          {filteredCompanies?.map((company) => (
            <button
              key={company.id}
              type="button"
              className={`list-group-item ${
                querySel === company.id ? "active" : ""
              }`}
              onClick={() => pathChange(company.id, true)}
            >
              {`${company.id} ${company.companyName}`}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export const BranchList = ({ branches, querySel }) => {
  const { pathChange } = usePathChange();
  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredBranches = branches?.filter((branch) =>
    branch.branchName?.includes(searchText)
  );

  return (
    <>
      {/* 検索窓 */}
      <div className="my-2">
        <input
          type="text"
          autoFocus
          placeholder="検索"
          value={searchText}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* 店社リスト */}
      <div className="list-group">
        {filteredBranches?.map((branch) => (
          <button
            key={branch.id}
            type="button"
            className={`list-group-item ${
              querySel === branch.id ? "active" : ""
            }`}
            onClick={() => pathChange(branch.id, true)}
          >
            {`${branch.branchName}`}
          </button>
        ))}
      </div>
    </>
  );
};

export const EmpList = ({ emps, querySel }) => {
  const { pathChange } = usePathChange();
  // 検索用
  const [searchText, setSearchText] = useState("");
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };
  const filteredEmps = emps?.filter(
    (emp) =>
      emp.lastName.includes(searchText) || emp.firstName.includes(searchText)
  );

  return (
    <>
      {/* 検索窓 */}
      <div className="my-2">
        <input
          type="text"
          autoFocus
          placeholder="検索"
          value={searchText}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      {/* 社員リスト */}
      <div className="list-group">
        {filteredEmps?.map((emp) => (
          <button
            key={emp.id}
            type="button"
            className={`list-group-item ${querySel === emp.id ? "active" : ""}`}
            onClick={() => pathChange(emp.id, true)}
          >
            {`${emp.lastName} ${emp.firstName}`}
          </button>
        ))}
      </div>
    </>
  );
};
