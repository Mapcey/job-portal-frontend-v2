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

export interface saved_jobs {
  JobId: number;
  employer: {
    CompanyName: string;
    WebSite: string | null;
  };
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

export interface EMP_DATA {
  CompanyName: string;
  WebSite: string;
}

export interface EMP_POSTED_JOBS {
  JobId: number;
  employer: EMP_DATA;
  JobTitle: string;
  Location: string;
  JobCategory: string;
  JobType: string;
  WorkType: string;
  EducationLevel: string;
  ProfExperience: string;
  Languages: string;
  SalaryRange: string;
  ExpiryDate: string; // ISO date string from API
  PostedDate: string; // ISO date string from API
  Description: string;
  Status: string;
}
