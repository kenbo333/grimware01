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
  const companies =
    router.query.isStatus === "false"
      ? [...props.data.filter((item) => !item.isStatus)]
      : [...props.data.filter((item) => item.isStatus)];
  const { sel } = router.query;

  return (
    <>
      <Navbar />
      <Header items={companies} type="company" sel={sel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={companies} type="company" sel={sel} />
          </div>

          {sel ? (
            <div className="col-8">
              <TabPrimeCompany companies={companies} sel={sel} />
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
