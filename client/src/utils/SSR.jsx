import { apiClient } from "../../lib/apiClient";

export const getData = async (context) => {
  try {
    // const response = await apiClient.get(context.resolvedUrl);
    const response = await apiClient.get(context);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
