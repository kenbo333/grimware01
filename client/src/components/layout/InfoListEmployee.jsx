import React from "react";

const InfoListEmployee = (props) => {
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
            <div className="col-4">{emp.tel}</div>
            <div className="col-8">{emp.email}</div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default InfoListEmployee;
