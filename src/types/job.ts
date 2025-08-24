export interface JOB {
  JobId: number;
  CompanyId: number;
  CompanyName: string;
  JobTitle: string;
  Location: string;
  JobCategory: string;
  JobType: string;
  WorkType: string;
  EducationLevel: string;
  ProfExperience: number;
  Languages: string;
  SalaryRange: string;
  ExpiryDate: string;
  PostedDate: string;
  Description: string;
  Status: string;
}

export interface CREATE_JOB {
  JobTitle: string;
  Location: string;
  JobCategory: string;
  JobType: string;
  WorkType: string;
  EducationLevel: string;
  ProfExperience: string;
  Languages: string;
  SalaryRange: string;
  ExpiryDate: string;
  Description: string;
  Status: string;
}
