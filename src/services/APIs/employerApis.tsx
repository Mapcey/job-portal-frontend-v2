import axiosInstance from "./axiosInstance";

// http://qvf.93e.mytemp.website/api2/

// employer details
export const getEmployer_test = async (id: string) => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};

// all employers details
export const getEmployers_test = async () => {
  const response = await axiosInstance.get(`/employers/`);
  return response.data;
};
