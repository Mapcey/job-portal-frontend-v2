export interface ApplicationsSeeker {
  ApplicationId: number;
  JobId: number;
  CompanyId: number;
  JobTitle: string;
  JobCategory: string;
  Description: string;  
  Status: string;
  ApplicantName: string;
  SeekerId: number;
  AppliedDateTime: string;
}

export interface Candidate {
  ApplicationId: number;
  SeekerId: number;
  ApplicantName: string;
  JobId: number;
  JobTitle: string;
  JobCategory?: string;
  AppliedDateTime?: string;
  Status: string;
}