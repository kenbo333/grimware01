import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabPrimeCompany from "../layout/TabPrimeCompany";
import TabSubCompany from "../layout/TabSubCompany";
import TabPurchaseCompany from "../layout/TabPurchaseCompany";

const tabCompanyComponents = {
  isPrime: TabPrimeCompany,
  isSub: TabSubCompany,
  isPurchase: TabPurchaseCompany,
};

const Company = (props) => {
  const { data, companyTypeField } = props;
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const TabCompany = tabCompanyComponents[companyTypeField];
  const [isCreate, setIsCreate] = useState(false);
  const isCreateState = { isCreate, setIsCreate };

  const companies = data.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header
        items={companies}
        table="company"
        companyTypeField={companyTypeField}
        setIsCreate={setIsCreate}
      />

      <div className="container-lg">
        <div className="row">
          {companies && (
            <div className="col-4">
              <ItemList items={companies} type="company" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabCompany companies={companies} isCreateState={isCreateState} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Company;
