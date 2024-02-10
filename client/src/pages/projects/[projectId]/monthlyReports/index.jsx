import { ItemList } from "@/components/layout/ItemList";
import Navbar from "@/components/layout/Navbar";
import TabMonthlyReport from "@/components/layout/project/monthlyReport/TabMonthlyReport";
import { getData } from "@/utils/SSR";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = (context) => {
  const { projectId } = context.params;
  return getData(`/projects/${projectId}`);
};

const monthlyReports = (props) => {
  const { monthlyReport: monthlyReports } = props.data;
  const router = useRouter();
  const { sel } = router.query;

  return (
    <div>
      <Navbar />
      <div className="bg-secondary" style={{ height: "46px" }}></div>

      <div className="container-lg">
        <div className="row">
          {monthlyReports && (
            <div className="col-4">
              <ItemList items={monthlyReports} type="monthlyReport" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabMonthlyReport project={props.data} sel={sel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default monthlyReports;
