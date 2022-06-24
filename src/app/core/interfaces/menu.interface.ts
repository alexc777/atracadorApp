export interface IParamsMenu {
  name: string;
  description: string;
  price: number;
  user_action: number;
}

export interface IEditMenu {
  id_menu: number;
  name: string;
  description: string;
  status: number;
  price: number;
  user_action: number;
}

export interface IResponseMenu {
  error: boolean;
  data: IListMenu[];
  code: number;
}

export interface IListMenu {
  id_menu: number;
  name: string;
  description: string;
  price: number;
  status: number;
}
