import axiosInstance from "./APIs/axiosInstance";

export const getAllJobs = async () => {
  const response = await axiosInstance.get(`/jobs/`);
  return response.data;
};

export const getJobDetails = async (id: string) => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

// SEEKER -----------------------------------------------------------------
export const signinSeeker = async (data: { uid: string; email: string }) => {
  const response = await axiosInstance.post(`/seeker/signin`, data);
  return response.data;
};

// EMPLOYER ---------------------------------------------------------------
export const signinEmployer = async (data: { uid: string; email: string }) => {
  const response = await axiosInstance.post(`/employer/signin`, data);
  return response.data;
};

export const getAllEmployer = async (id: string) => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};
