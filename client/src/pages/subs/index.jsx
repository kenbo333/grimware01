import { getData } from "../../utils/SSR";
import Company from "@/components/pages/Company";

export const getServerSideProps = (context) => getData("/companies?isSub=true");

const SubCompany = (props) => {
  return <Company data={props.data} companyTypeField="isSub" />;
};

export default SubCompany;
