// src/store/jobStore.ts
import { create } from "zustand";
import { Job } from "../types/job"; // Adjust path to your Job type

interface JobStore {
  jobs: Job[] | null;
  lastFetched: number | null;
  setJobs: (jobs: Job[]) => void;
  clearJobs: () => void;
  isCacheValid: () => boolean;
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: null,
  lastFetched: null,
  setJobs: (jobs) =>
    set({
      jobs,
      lastFetched: Date.now(),
    }),
  clearJobs: () =>
    set({
      jobs: null,
      lastFetched: null,
    }),
  isCacheValid: () => {
    const { lastFetched } = get();
    const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
    return lastFetched !== null && Date.now() - lastFetched < CACHE_DURATION;
  },
}));
