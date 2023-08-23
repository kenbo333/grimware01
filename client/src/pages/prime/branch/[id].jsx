import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getData } from "../../../utils/SSR";
import { ItemList } from "@/components/ItemList";
import { Header } from "@/components/Header";
import PrimeBranchTab from "@/components/PrimeBranchTab";

export const getServerSideProps = (context) => getData(context);

const Branch = (props) => {
  // console.log(props.data);
  const branches = props.data.companyBranch;
  const company = props.data;
  const router = useRouter();
  const querySel = router.query.sel;

  return (
    <>
      <Navbar />
      <Header items={branches} type="branch" querySel={querySel} />

      <div className="container-lg">
        <div className="row">
          <div className="col-4">
            <ItemList items={branches} type="branch" querySel={querySel} />
          </div>

          {querySel ? (
            <div className="col-8">
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
    </>
  );
};

export default Branch;
