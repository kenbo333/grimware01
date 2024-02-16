import { useSaveData } from "@/components/containers/handleItem";
import { HalfFrom } from "@/components/forms/InputForm";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import { useRouter } from "next/router";
import React from "react";

const keysToParse = [
  "invoiceAmount",
  "invoiceAmountWithTax",
  "paymentCash1",
  "paymentCash2",
  "paymentNote1",
  "paymentNote2",
  "paymentEBond1",
  "paymentEBond2",
  "adjustmentAmount",
];

const MRAccounting = (props) => {
  const { formUtils, sel } = props;
  const { endEdit } = formUtils;
  const router = useRouter();

  const { saveData } = useSaveData();
  const handleSave = async () => {
    try {
      const newFormData = endEdit();
      // strをintに変換
      keysToParse.forEach((key) => {
        const value = newFormData[key];
        if (value === "") {
          newFormData[key] = null;
        } else {
          const parsedValue = parseInt(value, 10);
          newFormData[key] = isNaN(parsedValue) ? null : parsedValue;
        }
      });
      await saveData(`/monthlyReports/${sel}`, newFormData);
      router.replace(router.asPath);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tab-pane active my-3">
      <div className="row mb-2">
        <div className="col-6">
          <HalfFrom
            title="請求金額"
            nameKey="invoiceAmount"
            formUtils={formUtils}
          />
          <HalfFrom
            title="税込"
            nameKey="invoiceAmountWithTax"
            formUtils={formUtils}
          />
        </div>
        <div className="col-6">
          <div>原価金額(計算)</div>
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
          />
          <HalfFrom
            title="(手形)"
            nameKey="paymentNote1"
            formUtils={formUtils}
          />
          <HalfFrom
            title="(電債)"
            nameKey="paymentEBond1"
            formUtils={formUtils}
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
          />
          <HalfFrom
            title="(電債)"
            nameKey="paymentEBond2"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6 offset-6">
          <HalfFrom
            title="調整金額"
            nameKey="adjustmentAmount"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 offset-6">入金差額(計算)</div>
      </div>

      <hr />

      <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
    </div>
  );
};

export default MRAccounting;
