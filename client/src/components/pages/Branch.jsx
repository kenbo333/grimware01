import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/layout/Navbar";
import { Header } from "@/components/layout/Header";
import { ItemList } from "@/components/layout/ItemList";
import TabPrimeBranch from "../layout/TabPrimeBranch";
import TabPurchaseBranch from "../layout/TabPurchaseBranch";
import TabSubBranch from "../layout/TabSubBranch";
import TabOwnBranch from "../layout/TabOwnBranch";

const tabBranchComponents = {
  isPrime: TabPrimeBranch,
  isPurchase: TabPurchaseBranch,
  isSub: TabSubBranch,
  isOwn: TabOwnBranch,
};

const Branch = ({ data, companyTypeField }) => {
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const company = data;
  const sessionIsCreate =
    typeof window !== "undefined" &&
    sessionStorage.getItem("sessionIsCreate") === "true";
  const [isCreate, setIsCreate] = useState(sessionIsCreate);
  const isCreateState = { isCreate, setIsCreate };
  const TabBranch = tabBranchComponents[companyTypeField];

  const branches = company.companyBranch.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header items={branches} table="branch" setIsCreate={setIsCreate} />

      <div className="container-lg">
        <div className="row">
          {branches && (
            <div className="col-4">
              <ItemList items={branches} type="branch" sel={sel} />
            </div>
          )}
          {sel && (
            <div className="col-8">
              <TabBranch
                company={company}
                branches={branches}
                isCreateState={isCreateState}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branch;
