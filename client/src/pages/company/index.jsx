import CompanyList from "@/components/NameList";
import PrimeDetail from "@/components/PrimeDetail";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCompanies } from "../../utils/SSR";

export const getServerSideProps = (context) => getCompanies(context);

const company = ({ companies }) => {
  const router = useRouter();
  const queryId = parseInt(router.query.sel);

  const [selected, setSelected] = useState(queryId || "");

  // 会社リスト選択したらCompanyDetailへ送る
  const selectedCompany = companies.find((item) => item.id === selected);
  const handleClick = (id) => {
    setSelected(id);
    router.push({
      pathname: "/company",
      query: { sel: id },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col-4">
            <CompanyList
              companies={companies}
              handleClick={handleClick}
              selected={selected}
            />
          </div>

          <div className="col-8">
            {selected ? (
              <div>
                <div>
                  <div>会社id: {selectedCompany?.id}</div>
                  <div>会社名: {selectedCompany?.companyName}</div>
                </div>

                <PrimeDetail selectedCompany={selectedCompany} />
              </div>
            ) : (
              <div>index</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default company;
