import { AddressForm } from "@/components/forms/InputAddressForm";
import {
  NameFrom,
  NameForm_kana,
  StartEndForm,
} from "@/components/forms/InputForm";
import React from "react";

const PJDetail = (props) => {
  const { formUtils } = props;

  return (
    <div className="tab-pane active my-3">
      <NameForm_kana title="名称" nameKey="name" formUtils={formUtils} />
      <div className="my-1"></div>
      <NameFrom title="略称" nameKey="shortName" formUtils={formUtils} />
      <div className="my-1"></div>
      <NameFrom title="客先番号" nameKey="clientNumber" formUtils={formUtils} />
      <div className="my-1"></div>
      <NameFrom title="ｶﾗｰｺｰﾄﾞ" nameKey="color" formUtils={formUtils} />
      <div className="my-1"></div>
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
      <div className="my-1"></div>
      <NameFrom title="TEL" nameKey="tel" formUtils={formUtils} />
      <div className="my-1"></div>
      <AddressForm formUtils={formUtils} />
      <div className="my-1"></div>
      <NameFrom title="距離" nameKey="distance" formUtils={formUtils} />
    </div>
  );
};

export default PJDetail;
