export interface Job {
  JobId: number;
  CompanyId: number;
  JobTitle: string;
  Location: string;
  JobCategory: string;
  JobType: string;
  WorkType: string;
  EducationLevel: string;
  ProfExperience: string;
  Languages: string;
  SalaryRange: string;
  ExpiryDate: string; // You can also use `Date` if parsing manually
  PostedDate: string; // Same as above
  Description: string;
  Status: string;
}
