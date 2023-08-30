import TabPrimeCompany from "@/components/layout/TabPrimeCompany";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";

export const getServerSideProps = (context) => getData(context);

const Company = (props) => {
  // console.log(props.data);
  const companies = props.data;
  const router = useRouter();
  const querySel = router.query.sel;

  return (
    <>
      <Navbar />
      <Header items={companies} type="company" querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={companies} type="company" querySel={querySel} />
          </div>

          {querySel ? (
            <div className="col-8">
              <TabPrimeCompany companies={companies} querySel={querySel} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Company;
