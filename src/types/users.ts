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

export interface CREATE_SEEKER {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
