import { useFetchSingle } from "@/components/containers/useFetchData";
import React from "react";

const MRExpenseDetail = (props) => {
  const { sel } = props;

  const {
    data: details,
    error,
    isLoading,
  } = useFetchSingle(`/expenseDetails?fk_monthlyReportId=${sel}`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col-2">発生日</div>
        <div className="col-3">氏名</div>
        <div className="col-2">科目</div>
        <div className="col-2">
          <div>金額</div>
          <div>
            {details
              .reduce((acc, cur) => acc + cur.amount, 0)
              .toLocaleString() + "円"}
          </div>
        </div>
        <div className="col-3">摘要</div>
      </div>

      <hr className="my-1" />

      {details.map((detail) => (
        <div key={detail.id} className="row">
          <div className="col-2 small">{detail.date}</div>
          <div className="col-3 small">{`${detail.expense.companyEmployee.lastName} ${detail.expense.companyEmployee.firstName}`}</div>
          <div className="col-2 small">{detail.account}</div>
          <div className="col-2 small">{detail.amount}</div>
          <div className="col-3 small">備考</div>
        </div>
      ))}
    </div>
  );
};

export default MRExpenseDetail;
