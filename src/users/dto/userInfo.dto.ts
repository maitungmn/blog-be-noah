type TUserRoles = "admin" | "default"

export interface IUserInfo {
  name: string;
  phone: string;
  dob: string;
  email: string;
  password: string;
  role?: TUserRoles;
}