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

  console.log(details);

  return <div>MRExpense</div>;
};

export default MRExpenseDetail;
