import PrimeCompanyTab from "@/components/PrimeCompanyTab";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../utils/SSR";
import { ItemList } from "@/components/ItemList";
import { Header } from "@/components/Header";

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
              <PrimeCompanyTab companies={companies} querySel={querySel} />
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
