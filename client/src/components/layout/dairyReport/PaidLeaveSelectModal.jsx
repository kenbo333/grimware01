import React from "react";
import { useFetchSingle } from "@/components/containers/useFetchData";

const PaidLeaveSelectModal = (props) => {
  const {
    strDate,
    index,
    setModalIndexPaidLeave,
    modalSelect,
    fk_companyEmployeeId,
  } = props;

  const { data, error, isLoading } = useFetchSingle(
    `/paidLeaves?expirationDate_gte=${strDate}&fk_companyEmployeeId=${fk_companyEmployeeId}`
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const paidLeaves = data.filter((datum) => {
    // 有休の中に日報当日があるか
    const isMatchingStrDate = datum.dailyReport.some(
      (report) => report.fk_dailyId === strDate
    );
    // 期限内であるかつ、有休が残っているか
    const isWithinDateRange =
      new Date(strDate) >= new Date(datum.grantDate) &&
      new Date(strDate) <= new Date(datum.expirationDate);
    const hasRemainingLeaves = datum.grantDay > datum.dailyReport.length;
    // 上記の条件で表示
    return isMatchingStrDate || (isWithinDateRange && hasRemainingLeaves);
  });

  // console.log(paidLeaves);

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">有休選択</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModalIndexPaidLeave(null)}
            ></button>
          </div>

          <div className="modal-body">
            <div className="list-group">
              {paidLeaves.map((paidLeave) => (
                <button
                  key={paidLeave.id}
                  type="button"
                  className="list-group-item list-group-item-action"
                  name="fk_paidLeaveId"
                  data-index={index}
                  value={paidLeave.id}
                  //表示用にdata-valueを追加
                  data-value={JSON.stringify({
                    grantDate: paidLeave.grantDate,
                  })}
                  onClick={(e) => {
                    modalSelect(e, "paidLeave");
                    setModalIndexPaidLeave(null);
                  }}
                >
                  {paidLeave.grantDate}
                </button>
              ))}
              <button
                type="button"
                className="list-group-item list-group-item-action"
                name="fk_paidLeaveId"
                data-index={index}
                value=""
                onClick={(e) => {
                  modalSelect(e, "paidLeave");
                  setModalIndexPaidLeave(null);
                }}
              >
                取り消し
              </button>
            </div>
          </div>

          <div className="modal-footer justify-content-center"></div>
        </div>
      </div>
    </div>
  );
};

export default PaidLeaveSelectModal;
