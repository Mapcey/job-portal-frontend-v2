export interface Job {
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
export interface SavedJob {
  JobId: number;
  SavedDateTime?: string;
}