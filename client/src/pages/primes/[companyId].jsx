import Navbar from "@/components/layout/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../utils/SSR";
import { ItemList } from "@/components/layout/ItemList";
import { Header } from "@/components/layout/Header";
import TabPrimeBranch from "@/components/layout/TabPrimeBranch";

// export const getServerSideProps = (context) => getData("companies/1");
export const getServerSideProps = (context) =>
  getData(`companies/${context.query.companyId}`);

const Branch = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const company = props.data;
  const branches =
    router.query.isStatus === "false"
      ? [...company.companyBranch.filter((item) => !item.isStatus)]
      : [...company.companyBranch.filter((item) => item.isStatus)];
  const { sel } = router.query;

  return (
    <>
      <Navbar />
      <Header items={branches} type="branch" sel={sel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={branches} type="branch" sel={sel} />
          </div>

          {sel ? (
            <div className="col-8">
              <TabPrimeBranch branches={branches} sel={sel} company={company} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Branch;
