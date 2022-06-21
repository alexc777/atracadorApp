export interface IUserParams {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id_rol: number;
  user_action: number;
}

export interface IUserEdit {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  id_rol: number;
  user_action: number;
}
