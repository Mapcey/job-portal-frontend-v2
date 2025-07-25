import axiosInstance from "../axiosInstance";

import { Job } from "../../types/job";
import { EMPLOYER_DATA } from "../../types/createUser";

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

export const userLogin = async () => {
  const response = await axiosInstance.post(`/auth/signin`);
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
// seeker signup
export const signupSeeker = async (data: { ContactNo: string }) => {
  const response = await axiosInstance.post(`/seekers/`, data);
  return response.data;
};

// EMPLOYER ---------------------------------------------------------------
// employer signup
export const signupEmployer = async (data: { ContactNo: string }) => {
  const response = await axiosInstance.post(`/employers/`, data);
  return response.data;
};

// employer profile data get
export const getEmployerData = async (id: string): Promise<EMPLOYER_DATA> => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};

// employer profile data update
export const putEmployerData = async (
  id: number,
  data: Partial<EMPLOYER_DATA>
): Promise<EMPLOYER_DATA> => {
  const response = await axiosInstance.put(`/employers/${id}`, data);
  return response.data;
};

// // regiter form after signup
// export const employerRegister = async (data: CREATE_EMPLOYER) => {
//   const response = await axiosInstance.post(`/employers/register`, data);
//   return response.data;
// };

export const getAllEmployer = async (id: string) => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};
