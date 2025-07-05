import axiosInstance from "./axiosInstance";
import { Job } from "../../types/job";

// mock data
import { mockJobs } from "../../mock/mockJobs";

// --------------------------------------------------------------
// get all jobs
// export const getAllJobs = async (): Promise<Job[]> => {
//   const response = await axiosInstance.get("/jobs/");
//   return response.data;
// };
// TEMP
export const getAllJobs = async (): Promise<Job[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockJobs);
    }, 1000); // simulate API delay
  });
};

// ---------------------------------------------------------------
export const getJobById = async (id: string): Promise<Job | undefined> => {
  return new Promise((resolve) => {
    const job = mockJobs.find((job) => job.JobId.toString() === id);
    setTimeout(() => resolve(job), 2000);
  });
};
