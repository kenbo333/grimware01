import { Header } from "@/components/layout/Header";
import { ItemList } from "@/components/layout/ItemList";
import Navbar from "@/components/layout/Navbar";
import { getData } from "@/utils/SSR";
import Link from "next/link";
import { useRouter } from "next/router";

export const getServerSideProps = (context) => getData("/companies?isOwn=true");

const OwnCompany = (props) => {
  // console.log(props.data);
  const router = useRouter();
  const { sel, isStatus } = router.query;

  const company = props.data[0];
  const branches = company.companyBranch;

  return (
    <div>
      <Navbar />
      <div>自社マスタ</div>

      <hr />

      {branches.map((branch) => (
        <div key={branch.id}>
          <Link href={`/ownCompany/${company.id}?sel=${branch.id}`}>
            {branch.branchName}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OwnCompany;
