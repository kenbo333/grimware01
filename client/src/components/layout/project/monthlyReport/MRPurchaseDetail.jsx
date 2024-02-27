import { useFetchSingle } from "@/components/containers/useFetchData";
import React, { useState } from "react";
import { getStartDayFromClosingDate } from "./getStartDayFromClosingDate";
import MRPurchaseModal from "./MRPurchaseModal";
import { formatAsYen } from "@/utils/formatting";

const MRPurchaseDetail = (props) => {
  const { projectNumber, closingDate } = props;
  const [isModal, setIsModal] = useState(false);
  const startDate = getStartDayFromClosingDate(closingDate);
  const {
    data: details,
    error,
    isLoading,
  } = useFetchSingle(
    //letが迄
    `/purchaseDetails?projectNumber=${projectNumber}&date_lte=${closingDate}&date_gte=${startDate}`
  );
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  // console.log(details);

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col">型式 数量 単価の表示はどうするか</div>
        <div className="col-3">金額</div>
        <div className="col-3">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setIsModal(true)}
          >
            会社別合計金額
          </button>
          {isModal && (
            <MRPurchaseModal
              details={details}
              onClose={() => setIsModal(false)}
            />
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-6">名称</div>
        <div className="col-3">
          {formatAsYen(
            details.reduce((acc, { totalPrice }) => acc + totalPrice, 0)
          )}
        </div>
        <div className="col-3">備考</div>
      </div>

      <hr className="my-1" />

      {details.map(({ name, totalPrice, remark }, i) => (
        <div className="row" key={i}>
          <div className="col-6 small">{name}</div>
          <div className="col-3 small">{formatAsYen(totalPrice)}</div>
          <div className="col-3 small">{remark}</div>
        </div>
      ))}
    </div>
  );
};

export default MRPurchaseDetail;
