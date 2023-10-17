import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = (context) =>
  getData("/companies?isPrime=true");

const PrimeCompany = (props) => {
  return <Company data={props.data} companyTypeField="isPrime" />;
};

export default PrimeCompany;
