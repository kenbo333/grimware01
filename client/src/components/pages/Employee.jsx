import React, { useState } from "react";
import TabPrimeEmployee from "../layout/TabPrimeEmployee";
import TabSubEmployee from "../layout/TabSubEmployee";
import TabPurchaseEmployee from "../layout/TabPurchaseEmployee";
import { useRouter } from "next/router";
import Navbar from "../layout/Navbar";
import { HeaderMaster } from "../layout/HeaderMaster";
import { ItemList } from "../layout/ItemList";
import TabOwnEmployee from "../layout/TabOwnEmployee";

const tabEmployeeComponents = {
  isPrime: TabPrimeEmployee,
  isSub: TabSubEmployee,
  isPurchase: TabPurchaseEmployee,
  isOwn: TabOwnEmployee,
};

const Employee = ({ data, companyTypeField }) => {
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const branch = data;
  const TabEmployee = tabEmployeeComponents[companyTypeField];
  const sessionIsCreate =
    typeof window !== "undefined" &&
    sessionStorage.getItem("sessionIsCreate") === "true";
  const [isCreate, setIsCreate] = useState(sessionIsCreate);
  const isCreateState = { isCreate, setIsCreate };

  const emps = branch.companyEmployee.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <HeaderMaster items={emps} table="employee" setIsCreate={setIsCreate} />

      <div className="container-lg">
        <div className="row">
          {emps && (
            <div className="col-4">
              <ItemList items={emps} type="employee" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabEmployee
                emps={emps}
                branch={branch}
                isCreateState={isCreateState}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
