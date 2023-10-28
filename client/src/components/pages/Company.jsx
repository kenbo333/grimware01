import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { ItemList } from "@/components/layout/ItemList";
import { HeaderMaster } from "@/components/layout/HeaderMaster";
import TabPrimeCompany from "../layout/TabPrimeCompany";
import TabSubCompany from "../layout/TabSubCompany";
import TabPurchaseCompany from "../layout/TabPurchaseCompany";
import { usePathManager } from "../containers/handleItem";

const tabCompanyComponents = {
  isPrime: TabPrimeCompany,
  isSub: TabSubCompany,
  isPurchase: TabPurchaseCompany,
};

const Company = (props) => {
  const { data, companyTypeField } = props;
  const router = useRouter();
  const { sel } = router.query;
  const TabCompany = tabCompanyComponents[companyTypeField];
  const [isCreate, setIsCreate] = useState(false);
  const isCreateState = { isCreate, setIsCreate };

  const companies = data.filter((company) => company.isOwn !== true);

  // //一番上のitemを選択
  const { pathChange } = usePathManager();
  if (companies.length > 0 && !sel) {
    pathChange(companies[0].id, true);
  }

  return (
    <div>
      <Navbar />
      <HeaderMaster
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
