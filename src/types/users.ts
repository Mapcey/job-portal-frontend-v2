export interface EMPLOYER_DATA {
  EmployerId: number;
  FirebaseUID: string;
  CompanyName: string;
  ContactNo: string;
  WebSite: string;
  Location: string;
  LinkedIn: string;
  Overview: string;
  IsSub: boolean;
}

export interface SEEKER_DATA {
  UserId: number;
  FirstName: string;
  LastName: string;
  ContactNo: string;
  LocationX: number;
  LocationY: number;
  Address: string;
  Email: string;
  ProfessionalExperience: number;
  DateOfBirth: Date;
  Salary: number;
  JobType: string;
  JobType2: string;
  SocialLinks: string;
  Summary: string;
  IsSubscribed: boolean;
  careers?: Career[];
  educations?: Education[];
  skills?: Skill[];
  languages?: languages[];
}
export interface Career {
  id: number;
  Designation: string;
  CompanyName: string;
  StartDate: string;
  EndDate?: string;
  Description?: string;
}
export interface Education {
  id: number;
  InstituteName: string;
  FieldOfStudy: string;
  StartDate: string;
  EndDate?: string;
  Status?: string;
  LevelOfStudy?: string;
}
export interface CREATE_SEEKER {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
export interface Skill {
  id: number;
  Skill: string;
  ExpertLevel: string;
}

export interface languages{
  id: number;
  Language: string;
  ExpertLevel: string;
}
export interface seekerFiles{
  id: number;
  user_id: number;
  file_name: string;
  file_url: string;
  uploaded_at: Date;
  file_type: string;
}

