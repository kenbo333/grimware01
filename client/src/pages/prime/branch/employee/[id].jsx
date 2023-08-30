import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabPrimeEmployee from "@/components/layout/TabPrimeEmployee";

export const getServerSideProps = (context) => getData(context);

const Employee = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const querySel = router.query.sel;
  const branch = props.data;
  const emps = branch.companyEmployee;

  return (
    <div>
      <Navbar />
      <Header items={emps} type="employee" querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={emps} type="employee" querySel={querySel} />
          </div>

          {querySel ? (
            <div className="col-8">
              <TabPrimeEmployee
                emps={emps}
                querySel={querySel}
                branch={branch}
              />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
