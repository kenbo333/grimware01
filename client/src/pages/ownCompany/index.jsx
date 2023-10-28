import Navbar from "@/components/layout/Navbar";
import { getData } from "@/utils/SSR";
import Link from "next/link";

export const getServerSideProps = (context) => getData("/companies?isOwn=true");

const OwnCompany = (props) => {
  // console.log(props.data);
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
            {branch.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default OwnCompany;
