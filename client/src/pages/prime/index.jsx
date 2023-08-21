import PrimeCompanyTab from "@/components/PrimeCompanyTab";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getCompanies } from "../../utils/SSR";
import { CompanyList } from "@/components/NameList";
import { Header } from "@/components/Header";

export const getServerSideProps = (context) => getCompanies(context);

const company = (props) => {
  // console.log(props.companies);
  const { companies } = props;
  const router = useRouter();
  const querySel = router.query.sel;

  return (
    <>
      <Navbar />
      <Header items={companies} type="company" querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <CompanyList companies={companies} querySel={querySel} />
          </div>

          <div className="col-8">
            {querySel ? (
              <div>
                <PrimeCompanyTab companies={companies} querySel={querySel} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default company;
