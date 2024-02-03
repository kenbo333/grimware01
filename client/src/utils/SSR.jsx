import { apiClient } from "../../lib/apiClient";

export const getData = async (url) => {
  try {
    const response = await apiClient.get(url);
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    console.error(error);
  }
};
