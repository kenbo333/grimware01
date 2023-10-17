import { getData } from "../../../../utils/SSR";
import Employee from "@/components/pages/Employee";

export const getServerSideProps = (context) => {
  const { companyId, branchId } = context.params;
  return getData(`/companies/${companyId}/branches/${branchId}`);
};

const PrimeEmployee = (props) => {
  return <Employee data={props.data} companyTypeField="isPrime" />;
};

export default PrimeEmployee;
