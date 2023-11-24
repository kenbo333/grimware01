import { getData } from "../../../../utils/SSR";
import Branch from "@/components/pages/Branch";

export const getServerSideProps = (context) => {
  const { companyId } = context.params;
  return getData(`/companies/${companyId}`);
};

const SubBranch = (props) => {
  return <Branch data={props.data} companyTypeField="isSub" />;
};

export default SubBranch;
