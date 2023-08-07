import apiClient from "../../lib/apiClient";

export const getCompanies = async (context) => {
  try {
    const companiesResponse = await apiClient.get(context.resolvedUrl);
    return {
      props: {
        companies: companiesResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};

export const getCompany = async (context) => {
  try {
    const companyResponse = await apiClient.get(context.resolvedUrl);
    return {
      props: {
        company: companyResponse.data,
      },
    };
  } catch (err) {
    console.log(err);
  }
};
