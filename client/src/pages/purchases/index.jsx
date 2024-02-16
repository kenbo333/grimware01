import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = async (context) => {
  const { isStatus } = context.query;
  const statusQuery = isStatus === "false" ? "false" : "true";
  const apiUrl = `/companies?isPurchase=true&isStatus=${statusQuery}`;

  return getData(apiUrl);
};

const PurchaseCompany = (props) => {
  return <Company data={props.data} companyTypeField="isPurchase" />;
};

export default PurchaseCompany;
