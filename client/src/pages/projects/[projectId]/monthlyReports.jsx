import { ItemList } from "@/components/layout/ItemList";
import Navbar from "@/components/layout/Navbar";
import TabMonthlyReport from "@/components/layout/project/monthlyReport/TabMonthlyReport";
import { getData } from "@/utils/SSR";
import { useRouter } from "next/router";
import React from "react";

export const getServerSideProps = (context) => {
  const { projectId } = context.params;
  return getData(`/projects/${projectId}/monthlyReports`);
};

const monthlyReports = (props) => {
  const router = useRouter();
  const { sel } = router.query;
  const reports = props.data;
  // console.log(props.data);

  return (
    <div>
      <Navbar />
      <div className="bg-secondary" style={{ height: "46px" }}></div>

      <div className="container-lg">
        <div className="row">
          {reports && (
            <div className="col-4">
              <ItemList items={reports} type="monthlyReport" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabMonthlyReport reports={reports} sel={sel} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default monthlyReports;
