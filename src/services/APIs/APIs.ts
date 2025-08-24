import axiosInstance from "../axiosInstance";

import { Job } from "../../types/job";
import { EMPLOYER_DATA, SEEKER_DATA } from "../../types/users";
import { saved_jobs } from "../../types/job";

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

// SEEKER -----------------------------------------------------------------
// seeker signup
export const signupSeeker = async (data: { ContactNo: string }) => {
  const response = await axiosInstance.post(`/seekers/`, data);
  return response.data;
};

export const getSeekerData = async (id: string): Promise<SEEKER_DATA> => {
  const response = await axiosInstance.get(`/seekers/${id}`);
  return response.data;
};
export const getSeekerSavedJobs = async (id: string): Promise<saved_jobs[]> => {
  const response = await axiosInstance.get(`/seekers/${id}/saved_jobs`);
  return response.data;
  
};
/*export const updateSeeker = async (data: { "FirstName": "string",
  LastName: string,
  ContactNo: string,
  LocationX: 0,
  LocationY: 0,
  Address: string,
  Email: string,
  ProfessionalExperience: 0,
  DateOfBirth: string,
  Salary: 0,
  JobType: string,
  JobType2: string,
  SocialLinks: string,
  Summary: string,
  IsSubscribed: false
}) => {
  const response = await axiosInstance.get(`/seekers/${id}`, data);
  return response.data;
  
};*/
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
// Job
export const getJobDetails = async (id: string): Promise<Job> => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};
export const deleteSeekerSavedJob = async (
  seekerId: string,
  jobId: number
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${seekerId}/saved_jobs/${jobId}`);
};

//notification
export const getSeekerNotifications = async (seekerId: string) => {
  const response = await axiosInstance.get(`/seekers/${seekerId}/notifications`);
  return response.data;
}
/*export const markNotificationAsRead = async (
  seekerId: string,
  notificationId: number
) => {
  await axiosInstance.put(`/seekers/${seekerId}/notifications/${notificationId}/read`);
};*/

/*export const deleteNotifications = async (
  seekerId: string,
  jobId: number
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${seekerId}/notifications/${jobId}`);
};*/
