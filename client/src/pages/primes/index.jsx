import TabPrimeCompany from "@/components/layout/TabPrimeCompany";
import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";

export const getServerSideProps = (context) => getData("/companies");

const Company = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const { sel, isStatus } = router.query;

  const companies = props.data.filter((item) =>
    isStatus === undefined ? item.isStatus : !item.isStatus
  );

  return (
    <div>
      <Navbar />
      <Header items={companies} type="company" />

      <div className="container-lg">
        <div className="row">
          {companies && (
            <div className="col-4">
              <ItemList items={companies} type="company" sel={sel} />
            </div>
          )}

          {sel && (
            <div className="col-8">
              <TabPrimeCompany companies={companies} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Company;
