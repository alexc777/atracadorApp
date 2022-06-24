export interface ILoginForm {
  email: string;
  password: string;
}

export interface IResponseLogin {
  error: boolean;
  code: number;
  data: ILoginData;
}

export interface ILoginData {
  first_name: string;
  last_name: string;
  id_user: number;
  id_rol: number;
}
