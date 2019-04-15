export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isActive?: boolean;
  registered?: any;
  hide?: boolean;
}
