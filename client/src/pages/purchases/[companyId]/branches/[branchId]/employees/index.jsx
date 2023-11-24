import { getData } from "../../../../../../utils/SSR";
import Employee from "@/components/pages/Employee";

export const getServerSideProps = (context) => {
  const { companyId, branchId } = context.params;
  return getData(`/companies/${companyId}/branches/${branchId}`);
};

const PurchaseEmployee = (props) => {
  return <Employee data={props.data} companyTypeField="isPurchase" />;
};

export default PurchaseEmployee;
