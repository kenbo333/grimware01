import { getData } from "../../../../utils/SSR";
import Employee from "@/components/pages/Employee";

export const getServerSideProps = (context) => {
  const { companyId, branchId } = context.params;
  return getData(`/companies/${companyId}/branches/${branchId}`);
};

const OwnEmployee = (props) => {
  return <Employee data={props.data} companyTypeField="isOwn" />;
};

export default OwnEmployee;
