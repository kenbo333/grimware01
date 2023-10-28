import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = async (context) => {
  const { isStatus } = context.query;
  const statusQuery = isStatus === "false" ? "&isStatus=false" : "";
  const apiUrl = `/companies?isPurchase=true${statusQuery}`;

  return getData(apiUrl);
};

const PurchaseCompany = (props) => {
  return <Company data={props.data} companyTypeField="isPurchase" />;
};

export default PurchaseCompany;
