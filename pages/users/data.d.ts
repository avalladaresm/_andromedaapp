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

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: UsersListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: {
    [key: string]: string;
  };
  filter?: {
    [key: string]: React.ReactText[];
  };
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
  