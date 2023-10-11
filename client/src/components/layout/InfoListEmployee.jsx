import Link from "next/link";
import React from "react";

export const InfoListEmployee = (props) => {
  const { emps, link } = props;
  return (
    <div>
      <div className="row h6">
        <div className="col-4">氏名/TEL</div>
        <div className="col-8">Email</div>
      </div>

      <hr />

      {emps?.map((emp) => (
        <div key={emp.id}>
          <div className="row">
            <div className="col-4">
              {emp.lastName} {emp.firstName}
            </div>
          </div>
          <div className="row">
            <div className="col-4">{emp.compMobile}</div>
            <div className="col-8">{emp.compEmail}</div>
          </div>
          {link && <Link href={link + emp.id}>社員リンク</Link>}
          <hr />
        </div>
      ))}
    </div>
  );
};

//
export const InfoListEmployeeBranch = (props) => {
  const { emps } = props;
  return (
    <div>
      <div className="row h6">
        <div className="col-4">氏名/TEL</div>
        <div className="col-8">店社名/Email</div>
      </div>

      <hr />

      {emps?.map((emp) => (
        <div key={emp.id}>
          <div className="row">
            <div className="col-4">
              {emp.lastName} {emp.firstName}
            </div>
            <div className="col-8">{emp.companyBranch.branchName}</div>
          </div>
          <div className="row">
            <div className="col-4">{emp.compMobile}</div>
            <div className="col-8">{emp.compEmail}</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
