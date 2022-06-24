export interface IResponRoles {
  error: boolean;
  code: number;
  data: IListRoles[];
}

export interface IListRoles {
  name: string;
  id_rol: number;
}

export interface IResponseUsers {
  error: boolean;
  data: IListUsers[];
  code: number;
}

export interface IListUsers {
  id_user: number;
  first_name: string;
  last_name: string;
  email: string;
  id_rol: number;
}

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
