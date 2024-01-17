import React, { useEffect, useState } from "react";
import apiClient from "../../../../lib/apiClient";
import { HalfFrom } from "@/components/forms/InputForm";
import Link from "next/link";

const PJMonthlyReport = (props) => {
  const { sel, formUtils } = props;

  const [monRepStates, setMonRepStates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`/projects/${sel}/monthlyReports`);
        setMonRepStates(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [sel]);

  return (
    <div className="tab-pane active my-3">
      <div className="row">
        <div className="col-6">
          <HalfFrom
            title="見積金額(税抜)"
            nameKey="estimateAmount"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="請負金額(税抜)"
            nameKey="contractAmount"
            formUtils={formUtils}
            type="text"
          />
          <HalfFrom
            title="見積金額(税込)"
            nameKey="contractAmountWithTax"
            formUtils={formUtils}
            type="text"
          />
        </div>
        <div className="col-6">
          <div>{`入金残金`}</div>
          <div>{`請求残金`}</div>
          <div className="my-2"></div>
          <div>請求人工単価平日</div>
          <div>請求人工単価休日</div>
        </div>

        <div className="row"></div>
      </div>

      <hr />

      <div>
        {monRepStates.map((monRep, i) => (
          <div key={i}>
            <Link href={`/projects/${sel}/monthlyReports?sel=${monRep.id}`}>
              {monRep.closingDate}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PJMonthlyReport;
