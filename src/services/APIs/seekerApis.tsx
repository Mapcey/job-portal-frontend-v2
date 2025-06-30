import axiosInstance from "./axiosInstance";
import { Job } from "../../types/job";

// get all jobs
export const getAllJobs = async (): Promise<Job[]> => {
  const response = await axiosInstance.get("/jobs/");
  return response.data;
};
