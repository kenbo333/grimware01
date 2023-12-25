import { HalfFrom } from "@/components/forms/InputForm";
import React from "react";

const MRAccounting = (props) => {
  const { formUtils } = props;

  return (
    <div className="tab-pane fade show active my-3">
      <div className="row mb-2">
        <div className="col-6">
          <HalfFrom
            title="請求金額"
            nameKey="invoiceAmount"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="税込"
            nameKey="invoiceAmountWithTax"
            formUtils={formUtils}
            type="text"
          />
        </div>
        <div className="col-6">
          <div>原価金額(計算)</div>
          <div>請求希望額(計算)</div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfFrom
            title="請求日"
            nameKey="invoiceDate"
            formUtils={formUtils}
            type="date"
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfFrom
            title="入金予定日1"
            nameKey="invoiceDueDate1"
            formUtils={formUtils}
            type="date"
          />
          <HalfFrom
            title="入金日1"
            nameKey="paymentDate1"
            formUtils={formUtils}
            type="date"
          />
        </div>
        <div className="col-6">
          <HalfFrom
            title="入金額1|現金"
            nameKey="paymentCash1"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="(手形)"
            nameKey="paymentNote1"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="(電債)"
            nameKey="paymentEBond1"
            formUtils={formUtils}
            type="text"
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfFrom
            title="入金予定日2"
            nameKey="invoiceDueDate2"
            formUtils={formUtils}
            type="date"
          />
          <HalfFrom
            title="入金日2"
            nameKey="paymentDate2"
            formUtils={formUtils}
            type="date"
          />
        </div>
        <div className="col-6">
          <HalfFrom
            title="入金額2|現金"
            nameKey="paymentCash2"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="(手形)"
            nameKey="paymentNote2"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="(電債)"
            nameKey="paymentEBond2"
            formUtils={formUtils}
            type="text"
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6 offset-6">
          <HalfFrom
            title="調整金額"
            nameKey="adjustmentAmount"
            formUtils={formUtils}
            type="text"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 offset-6">入金差額(計算)</div>
      </div>
    </div>
  );
};

export default MRAccounting;
