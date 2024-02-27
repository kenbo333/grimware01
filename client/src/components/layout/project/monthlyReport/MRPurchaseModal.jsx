import { formatAsYen } from "@/utils/formatting";
import React from "react";

// 仕入会社ごとのtotalPriceを集計し、Reactコンポーネントとして表示するための関数
const calculateTotalPriceByCompany = (data) => {
  const ObjTotals = data.reduce(
    (acc, { fk_companyId, totalPrice, company }) => {
      // 既に該当するcompanyIdの集計が存在する場合は、totalPriceを加算
      if (acc[fk_companyId]) {
        acc[fk_companyId].totalPrice += totalPrice;
      } else {
        // 該当するcompanyIdの集計が存在しない場合は、新しい集計を追加
        acc[fk_companyId] = {
          companyId: fk_companyId,
          companyName: company.name,
          totalPrice,
        };
      }
      return acc;
    },
    {} // 初期値は空のオブジェクト
  );
  // ObjTotalsオブジェクトから値だけを取り出し、配列に変換
  const totals = Object.values(ObjTotals);

  return totals.map(({ companyId, companyName, totalPrice }) => (
    <div className="row" key={companyId}>
      <div className="col-6">{companyName}</div>
      <div className="col-6">{formatAsYen(totalPrice)}</div>
    </div>
  ));
};

const MRPurchaseModal = (props) => {
  const { details, onClose } = props;

  return (
    <div
      className="modal show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {/* <h5 className="modal-title"></h5> */}
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body">
            {calculateTotalPriceByCompany(details)}
          </div>

          {/* <div className="modal-footer"></div> */}
        </div>
      </div>
    </div>
  );
};

export default MRPurchaseModal;
