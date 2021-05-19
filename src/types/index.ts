export type StrObject = { [prop: string]: any };

export interface UserDTO {
  username?: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}
