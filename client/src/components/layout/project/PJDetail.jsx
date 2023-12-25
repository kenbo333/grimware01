import { AddressForm } from "@/components/forms/InputAddressForm";
import {
  NameFrom,
  NameFrom_kana,
  StartEndForm,
} from "@/components/forms/InputForm";
import React from "react";

const PJDetail = (props) => {
  const { formUtils } = props;

  return (
    <div className="tab-pane fade show active my-3">
      <div className="mb-2">
        <NameFrom_kana title="名称" nameKey="name" formUtils={formUtils} />
      </div>
      <div className="mb-2">
        <NameFrom title="略称" nameKey="shortName" formUtils={formUtils} />
      </div>
      <div className="mb-2">
        <NameFrom
          title="客先番号"
          nameKey="clientNumber"
          formUtils={formUtils}
        />
      </div>
      <div className="mb-2">
        <NameFrom title="ｶﾗｰｺｰﾄﾞ" nameKey="color" formUtils={formUtils} />
      </div>
      <div className="mb-2">
        <StartEndForm
          title="全体工期"
          startKey="projectStartDate"
          endKey="projectEndDate"
          formUtils={formUtils}
        />
        <StartEndForm
          title="自社工期"
          startKey="ownProjectStartDate"
          endKey="ownProjectEndDate"
          formUtils={formUtils}
        />
      </div>
      <div className="mb-2">
        <NameFrom title="TEL" nameKey="tel" formUtils={formUtils} />
      </div>
      <div className="mb-2">
        <AddressForm formUtils={formUtils} />
      </div>
      <div className="mb-2">
        <NameFrom title="距離" nameKey="distance" formUtils={formUtils} />
      </div>
    </div>
  );
};

export default PJDetail;
