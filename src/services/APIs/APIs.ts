import axiosInstance from "../axiosInstance";

import { Job } from "../../types/job";
import { Career, Education, EMPLOYER_DATA, SEEKER_DATA, Skill } from "../../types/users";
import { saved_jobs } from "../../types/job";
import { ApplicationsSeeker } from "../../types/applicationsSeeker";
import { JOB, CREATE_JOB, EMP_POSTED_JOBS } from "../../types/job";
import { EMPLOYER_DATA } from "../../types/users";

// ------------------ USER ------------------J
// get user info
export const getUserInfo = async () => {
  const response = await axiosInstance.get(`/user/me`);
  return response.data;
};

// user login
export const userLogin = async () => {
  const response = await axiosInstance.post(`/auth/signin`);
  return response.data;
};

// ------------------ JOBS ------------------

// get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
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

// ------------------ SEEKER ------------------
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

// seeker signup
export const signupSeeker = async (data: { ContactNo: string }) => {
  const response = await axiosInstance.post(`/seekers/`, data);
  return response.data;
};

// seeker profile data get
export const getSeekerData = async (id: string): Promise<SEEKER_DATA> => {
  const response = await axiosInstance.get(`/seekers/${id}`);
  return response.data;
};

// seeker profile data update
export const getSeekerSavedJobs = async (id: string): Promise<saved_jobs[]> => {
  const response = await axiosInstance.get(`/seekers/${id}/saved_jobs`);
  return response.data;
  
};

// Delete saved job for a seeker
export const deleteSavedJobs = async (
  seekerId: string,
  jobId: string,
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${seekerId}/saved_jobs/${jobId}`);
};

// seeker applications data get
export const getSeekerApplications = async (id: string): Promise<ApplicationsSeeker[]> => {
  const response = await axiosInstance.get(`/seekers/${id}/applications`);
  return response.data;
  
};

// Delete application for a seeker
export const deleteSeekerApplications = async (
  applicationid: string,
): Promise<void> => {
  await axiosInstance.delete(`/jobs/applications/${applicationid}`);
};

// seeker profile data update
export const updateSeeker = async (
  SeekerId: number,
  data: Partial<SEEKER_DATA>
) => {
  const response = await axiosInstance.put(`/seekers/${SeekerId}`, data);
  return response.data;
};


// ------------------ EMPLOYER ------------------

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

// get all employers
export const getAllEmployer = async (id: string) => {
  const response = await axiosInstance.get(`/employers/${id}`);
  return response.data;
};


// ------------------JOB DETAILS -------------------

// job details by id
export const getJobDetails = async (id: string): Promise<Job> => {
  const response = await axiosInstance.get(`/jobs/${id}`);
  return response.data;
};

// Delete a job for a seeker
export const deleteSeekerSavedJob = async (
  seekerId: string,
  jobId: number
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${seekerId}/saved_jobs/${jobId}`);
};


//-------------Notification Managementr------------------

// Get notifications for a seeker
export const getSeekerNotifications = async (seekerId: string) => {
  const response = await axiosInstance.get(`/seekers/${seekerId}/notifications`);
  return response.data;
}

// Mark a notification as read
export const markNotificationAsRead = async (
  seekerId: string,
  notificationId: number
) => {
  await axiosInstance.put(`/seekers/${seekerId}/notifications/${notificationId}`);
};

/*export const deleteNotifications = async (
  seekerId: string,
  jobId: number
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${seekerId}/notifications/${jobId}`);
};*/





//-------------Skills Management for Seeker------------------

// Update an existing skill
export const updateSkill = async (
  SeekerId: number, 
  SkillId: number, 
  data: Partial<Skill>
) => {
  const response = await axiosInstance.put(
    `/seekers/${SeekerId}/skills/${SkillId}`,
    data
  );
  return response.data;
};

// Add a new skill
export const addSkill = async (
  SeekerId: number,   
  data: Partial<Skill>
) => {
  const response = await axiosInstance.post(
    `/seekers/${SeekerId}/skills`,
    data
  );
  return response.data;
};

// Delete a skill
export const deleteSkill = async (
  SeekerId: number, 
  SkillId: number,
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${SeekerId}/skills/${SkillId}`);
};

//-------------Education Management for Seeker------------------
// Update an existing education
export const updateEducation = async (
  SeekerId: number, 
  EducationId: number, 
  data: Partial<Education>
) => {
  const response = await axiosInstance.put(
    `/seekers/${SeekerId}/educations/${EducationId}`,
    data
  );
  return response.data;
};

// Add a new education
export const addEducation = async (
  SeekerId: number,   
  data: Partial<Skill>
) => {
  const response = await axiosInstance.post(
    `/seekers/${SeekerId}/educations`,
    data
  );
  return response.data;
};

// Delete a education
export const deleteEducation = async (
  SeekerId: number, 
  EducationId: number,
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${SeekerId}/educations/${EducationId}`);
};

//-------------Career Management for Seeker------------------

// Update an existing Career
export const updateCareer = async (
  SeekerId: number, 
  CareerId: number, 
  data: Partial<Skill>
) => {
  const response = await axiosInstance.put(
    `/seekers/${SeekerId}/careers/${CareerId}`,
    data
  );
  return response.data;
};

// Add a new Career
export const addCareer = async (
  SeekerId: number,   
  data: Partial<Career>
) => {
  const response = await axiosInstance.post(
    `/seekers/${SeekerId}/careers`,
    data
  );
  return response.data;
};

// Delete a Career
export const deleteCareer = async (
  SeekerId: number, 
  CareerId: number,
): Promise<void> => {
  await axiosInstance.delete(`/seekers/${SeekerId}/careers/${CareerId}`);
};

