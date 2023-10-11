import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabSubBranch from "@/components/layout/TabSubBranch";

export const getServerSideProps = (context) => {
  const { companyId } = context.params;
  return getData(`/companies/${companyId}`);
};

const Branch = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const company = props.data;

  const branches = company.companyBranch.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header items={branches} type="branch" />

      <div className="container-lg">
        <div className="row">
          {branches && (
            <div className="col-4">
              <ItemList items={branches} type="branch" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabSubBranch branches={branches} company={company} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Branch;
