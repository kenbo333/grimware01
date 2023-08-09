import PrimeDetail from "@/components/PrimeDetail";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getCompanies } from "../../utils/SSR";
import { CompanyList } from "@/components/NameList";
import { CompanyHeader } from "@/components/Header";

export const getServerSideProps = (context) => getCompanies(context);

const company = (props) => {
  // console.log(props.companies);
  const { companies } = props;
  const router = useRouter();
  const querySel = router.query.sel;
  const selectedCompany = companies.find((item) => item.id === querySel);

  return (
    <>
      <Navbar />
      <CompanyHeader companies={companies} querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <CompanyList companies={companies} querySel={querySel} />
          </div>

          <div className="col-8">
            {querySel ? (
              <div>
                <div className="my-3">
                  <div>会社id: {selectedCompany?.id}</div>
                  <div>会社名: {selectedCompany?.companyName}</div>
                </div>

                <PrimeDetail selectedCompany={selectedCompany} />
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
