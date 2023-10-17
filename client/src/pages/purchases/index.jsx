import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = (context) =>
  getData("/companies?isPurchase=true");

const PurchaseCompany = (props) => {
  return <Company data={props.data} companyTypeField="isPurchase" />;
};

export default PurchaseCompany;
