import axiosInstance from "../axiosInstance";

import { JOB, CREATE_JOB, EMP_POSTED_JOBS } from "../../types/job";
import { EMPLOYER_DATA } from "../../types/users";

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

export const userLogin = async () => {
  const response = await axiosInstance.post(`/auth/signin`);
  return response.data;
};

// JOBS -----------------------------------------------------------------
export const getAllJobs = async (): Promise<JOB[]> => {
  const response = await axiosInstance.get("/jobs/");
  return response.data;
};

// export const getAllJobs = async (): Promise<JOB[]> => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mockJobs);
//     }, 1000); // simulate API delay
//   });
// };

export const getJobDetails = async (id: string): Promise<JOB> => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

export const createNewJob = async (data: CREATE_JOB): Promise<CREATE_JOB> => {
  const response = await axiosInstance.post(`/jobs/`, data);
  return response.data;
};

export const getEmployerPostedJobs = async (
  id: string
): Promise<EMP_POSTED_JOBS[]> => {
  const response = await axiosInstance.get(`/jobs/employer/${id}`);
  return response.data;
};

export const deleteJob = async (id: string) => {
  const response = await axiosInstance.delete(`/jobs/${id}`);
  return response.data;
};

export const editJob = async (id: string, data: CREATE_JOB) => {
  const response = await axiosInstance.put(`/jobs/${id}`, data);
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
