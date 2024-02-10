import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = async (context) => {
  const { isStatus } = context.query;
  const statusQuery = isStatus === "false" ? "false" : "true";
  const apiUrl = `/companies?isSub=true&isStatus=${statusQuery}`;

  return getData(apiUrl);
};

const SubCompany = (props) => {
  return <Company data={props.data} companyTypeField="isSub" />;
};

export default SubCompany;
