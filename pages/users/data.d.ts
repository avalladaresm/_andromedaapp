export interface UsersListItem {
  id: number;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  verified: boolean;
  cellphone: string;
  createdAt: string;
  lastLogin: string;
  address: string;
  cityId: number;
  stateId: number;
  countryId: string;
}

export interface UsersListItemForUpdate {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  cellphone: string;
  lastLogin: string;
  address: string;
  cityId: number;
  stateId: number;
  countryId: string;
}
