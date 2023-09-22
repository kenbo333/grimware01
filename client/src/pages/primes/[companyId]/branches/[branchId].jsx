import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabPrimeEmployee from "@/components/layout/TabPrimeEmployee";

export const getServerSideProps = (context) => {
  const { companyId, branchId } = context.params;
  return getData(`/companies/${companyId}/branches/${branchId}`);
};

const Employee = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const { sel, isStatus } = router.query;
  const branch = props.data;

  const emps = branch.companyEmployee.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header items={emps} type="employee" />

      <div className="container-lg">
        <div className="row">
          {emps && (
            <div className="col-4">
              <ItemList items={emps} type="employee" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabPrimeEmployee emps={emps} branch={branch} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
