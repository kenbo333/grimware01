import { useSaveData } from "@/components/containers/handleItem";
import { useFetchSingle } from "@/components/containers/useFetchData";
import { HalfForm } from "@/components/forms/InputForm";
import { ButtonEdit } from "@/components/ui/ButtonEdit";
import { formatAsYen } from "@/utils/formatting";
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
  const { formUtils } = props;
  const { endEdit } = formUtils;
  const router = useRouter();
  const { sel, projectId } = router.query;

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

  // 入金差額
  const paymentDifference = parseFloat(
    (parseFloat(formUtils.formData.invoiceAmountWithTax) || 0) -
      (parseFloat(formUtils.formData.paymentCash1) || 0) -
      (parseFloat(formUtils.formData.paymentCash2) || 0) -
      (parseFloat(formUtils.formData.paymentNote1) || 0) -
      (parseFloat(formUtils.formData.paymentNote2) || 0) -
      (parseFloat(formUtils.formData.paymentEBond1) || 0) -
      (parseFloat(formUtils.formData.paymentEBond2) || 0) -
      (parseFloat(formUtils.formData.adjustmentAmount) || 0)
  ).toFixed(0);

  const {
    data: costs,
    error,
    isLoading,
  } = useFetchSingle(`/projects/${projectId}/totalCosts`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const cost = costs.find(
    ({ closingDate }) => closingDate === formUtils.formData.closingDate
  );

  return (
    <div className="tab-pane active my-3">
      <div className="row mb-2">
        <div className="col-6">
          <HalfForm
            title="請求金額"
            nameKey="invoiceAmount"
            formUtils={formUtils}
          />
          <HalfForm
            title="税込"
            nameKey="invoiceAmountWithTax"
            formUtils={formUtils}
          />
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col-5">原価金額</div>
            <div className="col-7">{formatAsYen(cost.totalCosts)}</div>
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfForm
            type="date"
            title="請求日"
            nameKey="invoiceDate"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfForm
            type="date"
            title="入金予定日1"
            nameKey="invoiceDueDate1"
            formUtils={formUtils}
          />
          <HalfForm
            type="date"
            title="入金日1"
            nameKey="paymentDate1"
            formUtils={formUtils}
          />
        </div>
        <div className="col-6">
          <HalfForm
            title="入金額1|現金"
            nameKey="paymentCash1"
            formUtils={formUtils}
          />
          <HalfForm
            title="(手形)"
            nameKey="paymentNote1"
            formUtils={formUtils}
          />
          <HalfForm
            title="(電債)"
            nameKey="paymentEBond1"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6">
          <HalfForm
            title="入金予定日2"
            nameKey="invoiceDueDate2"
            formUtils={formUtils}
            type="date"
          />
          <HalfForm
            title="入金日2"
            nameKey="paymentDate2"
            formUtils={formUtils}
            type="date"
          />
        </div>
        <div className="col-6">
          <HalfForm
            title="入金額2|現金"
            nameKey="paymentCash2"
            formUtils={formUtils}
            type="text"
          />
          <HalfForm
            title="(手形)"
            nameKey="paymentNote2"
            formUtils={formUtils}
          />
          <HalfForm
            title="(電債)"
            nameKey="paymentEBond2"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-6 offset-6">
          <HalfForm
            title="調整金額"
            nameKey="adjustmentAmount"
            formUtils={formUtils}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-6 offset-6">
          <div className="row">
            <div className="col-5">入金差額</div>
            <div className="col-7">{formatAsYen(paymentDifference)}</div>
          </div>
        </div>
      </div>

      <hr />

      <ButtonEdit formUtils={formUtils} handleSave={handleSave} />
    </div>
  );
};

export default MRAccounting;
