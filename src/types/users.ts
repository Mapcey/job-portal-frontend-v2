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
}

export interface CREATE_SEEKER {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
