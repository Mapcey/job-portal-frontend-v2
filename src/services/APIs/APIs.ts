
import axiosInstance from "../axiosInstance";

import { Job } from "../../types/job";
import { Career, Education, EMPLOYER_DATA, languages, SEEKER_DATA, Skill,seekerFiles } from "../../types/users";
import { saved_jobs, SavedJob } from "../../types/job";
import { ApplicationsSeeker } from "../../types/applicationsSeeker";

// Add a new seeker file (image, video, cv) for a seeker
export const addSeekerFile = async (
  seekerId: number,
  data: Partial<seekerFiles>
) => {
  const response = await axiosInstance.post(`/seeker_files/${seekerId}/files`, data);
  return response.data;
};
// Update a specific seeker file (image, video, cv) by file ID
export const updateSeekerFile = async (
  seekerId: number,
  fileId: number,
  data: Partial<seekerFiles>
) => {
  const response = await axiosInstance.put(`/seeker_files/${seekerId}/files/${fileId}`, data);
  return response.data;
};

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

// ------------------ SEEKER ------------------

// seeker signup
export const signupSeeker = async (data: { ContactNo: string }) => {
  const response = await axiosInstance.post(`/seekers/`, data);
  return response.data;
};


// ------------------ SEEKER MAIN ------------------
export const createSeeker = async (
  data: Omit<
    SEEKER_DATA,
    "UserId" | "careers" | "educations" | "skills" | "languages"
  >
) => {
  try {
    const response = await axiosInstance.post("/seekers/", data);
    return response.data; // should return { UserId: number, ... }
  } catch (error) {
    console.error("Error creating seeker:", error);
    throw error;
  }
};

//Seeker files
export const getSeekerFiles = async (id: string): Promise<seekerFiles> => {
  const response = await axiosInstance.get(`/seeker_files/${id}/files`);
  return response.data;
};

// ------------------ CAREER ------------------
export const createCareer = async (career: Career & { SeekerId: number }) => {
  try {
    const response = await axiosInstance.post("/careers/", career);
    return response.data;
  } catch (error) {
    console.error("Error creating career:", error);
    throw error;
  }
};

// ------------------ EDUCATION ------------------
export const createEducation = async (education: Education & { SeekerId: number }) => {
  try {
    const response = await axiosInstance.post("/educations/", education);
    return response.data;
  } catch (error) {
    console.error("Error creating education:", error);
    throw error;
  }
};

// ------------------ SKILL ------------------
export const createSkill = async (skill: Skill & { SeekerId: number }) => {
  try {
    const response = await axiosInstance.post("/skills/", skill);
    return response.data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
};

// ------------------ LANGUAGE ------------------
export const createLanguage = async (language: languages & { SeekerId: number }) => {
  try {
    const response = await axiosInstance.post("/languages/", language);
    return response.data;
  } catch (error) {
    console.error("Error creating language:", error);
    throw error;
  }
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
//new application
export const addJobApplication = async (
  jobId: number,
  data: Partial<ApplicationsSeeker>
) => {
  const response = await axiosInstance.post(`/jobs/${jobId}/applications`, data);
  return response.data;
};

// seeker applications data get
export const getSeekerApplications = async (id: string): Promise<ApplicationsSeeker[]> => {
  const response = await axiosInstance.get(`/jobs/seeker/${id}/applications`);
  return response.data;
  
};

// Delete application for a seeker
export const deleteSeekerApplications = async (
  applicationId: number
): Promise<void> => {
  await axiosInstance.delete(`/jobs/applications/${applicationId}`);
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
//Save job

export const addSavedJob = async (
  SeekerId: number,
  data: SavedJob
): Promise<SavedJob> => {

  const response = await axiosInstance.post(
    `/seekers/${SeekerId}/saved_jobs`,
    data
  );
  return response.data;
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
  data: Partial<Education>
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
  data: Partial<Career>
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

