import { CREATE_EMPLOYER } from "../../types/createUser";
import axiosInstance from "../axiosInstance";

import { Job } from "../../types/job";

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

// JOBS -----------------------------------------------------------------
export const getAllJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs/");
  return response.data;
};

// export const getAllJobs = async (): Promise<Job[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockJobs);
//     }, 1000); // simulate API delay
//   });
// };

export const getJobDetails = async (id: string): Promise<Job> => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

// SEEKER -----------------------------------------------------------------
export const signinSeeker = async (data: { email: string; role: string }) => {
  const response = await axiosInstance.post(`/seeker/signin`, data);
  return response.data;
};

// EMPLOYER ---------------------------------------------------------------
export const signinEmployer = async (data: { email: string; role: string }) => {
  const response = await axiosInstance.post(`/employer/signin`, data);
  return response.data;
};

// regiter form after signup
export const employerRegister = async (data: CREATE_EMPLOYER) => {
  const response = await axiosInstance.post(`/employers/register`, data);
  return response.data;
};

export const getAllEmployer = async (id: string) => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};
