import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getCompany } from "../../utils/SSR";

export const getServerSideProps = (context) => getCompany(context);

const branch = ({ company }) => {
  const branches = company.CompanyBranch;

  const router = useRouter();
  const queryId = parseInt(router.query.sel);

  const [selected, setSelected] = useState(queryId || "");

  const selectedBranch = branches.find((item) => item.id === selected);
  const emps = selectedBranch?.CompanyEmployee;

  const handleClick = (id) => {
    setSelected(id);
    router.push({
      pathname: `/company/${router.query.id}`,
      query: { sel: id },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="list-group">
              {branches?.map((branch) => (
                <button
                  key={branch.id}
                  type="button"
                  className={`list-group-item ${
                    selected === branch.id ? "active" : ""
                  }`}
                  onClick={() => handleClick(branch.id)}
                >
                  {branch.branchName}
                </button>
              ))}
            </div>
          </div>

          <div className="col-8">
            <div>
              <div>会社名:{company.companyName}</div>
              <hr />
              <div>支店id:{selectedBranch?.id}</div>
              <div>支店名:{selectedBranch?.branchName}</div>
            </div>

            <hr />
            {emps?.map((emp) => (
              <div key={emp?.id}>
                <div>社員id:{emp?.id}</div>
                <div>社員名:{emp?.firstName}</div>
                <div>所属支店:{emp?.fk_companyBranchId}</div>
                <Link
                  href={`/company/branch/${emp.fk_companyBranchId}?sel=${emp.id}`}
                >
                  社員リンク
                </Link>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default branch;
