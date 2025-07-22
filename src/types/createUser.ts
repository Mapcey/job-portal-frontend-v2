export interface CREATE_EMPLOYER {
  companyName: string;
  location: string;
  phone: string;
  description?: string;
}

export interface CREATE_SEEKER {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}
