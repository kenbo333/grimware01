import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = async (context) => {
  const { isStatus } = context.query;
  const statusQuery = isStatus === "false" ? "false" : "true";
  const apiUrl = `/companies?isPrime=true&isStatus=${statusQuery}`;

  return getData(apiUrl);
};

const PrimeCompany = (props) => {
  return <Company data={props.data} companyTypeField="isPrime" />;
};

export default PrimeCompany;
