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
    // dailyReport内でfk_dailyIdの値とstrDateが同じ要素があるか確認
    const hasMatchingStrDate = datum.dailyReport.some(
      (report) => report.fk_dailyId === report.strDate
    );
    // 上記の条件またはgrantDayがdailyReportのlengthより大きい場合にdatumを返す
    return hasMatchingStrDate || datum.grantDay > datum.dailyReport.length;
  });

  console.log(paidLeaves);

  // return;

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
                キャンセル
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
