import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { getCompany } from "../../../utils/SSR";

export const getServerSideProps = (context) => getCompany(context);

const employee = ({ company }) => {
  const branch = company;
  const emps = company.CompanyEmployee;

  const router = useRouter();
  const queryId = parseInt(router.query.sel);

  const [selected, setSelected] = useState(queryId || "");
  const selectedEmp = emps.find((item) => item.id === selected);

  const handleClick = (id) => {
    setSelected(id);
    router.push({
      pathname: `/company/branch/${router.query.id}`,
      query: { sel: id },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="list-group">
              {emps?.map((emp) => (
                <button
                  key={emp.id}
                  type="button"
                  className={`list-group-item ${
                    selected === emp.id ? "active" : ""
                  }`}
                  onClick={() => handleClick(emp.id)}
                >
                  {emp.firstName}
                </button>
              ))}
            </div>
          </div>

          <div className="col-8">
            <div>
              <div>会社名:{branch.Company.companyName}</div>
              <div>支店id:{branch.id}</div>
              <hr />
              <div>社員id:{selectedEmp?.id}</div>
              <div>社員名:{selectedEmp?.firstName}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default employee;
