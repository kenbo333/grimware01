import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getCompany } from "../../../utils/SSR";
import { BranchList } from "@/components/NameList";
import { BranchHeader } from "@/components/Header";
import PrimeBranchTab from "@/components/PrimeBranchTab";

export const getServerSideProps = (context) => getCompany(context);

const Branch = ({ company }) => {
  // console.log(company);
  const branches = company.companyBranch;
  const router = useRouter();
  const querySel = router.query.sel;

  return (
    <>
      <Navbar />
      <BranchHeader branches={branches} querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <BranchList branches={branches} querySel={querySel} />
          </div>

          <div className="col-8">
            {querySel ? (
              <div>
                <PrimeBranchTab
                  branches={branches}
                  querySel={querySel}
                  companyName={company.companyName}
                />
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

export default Branch;
