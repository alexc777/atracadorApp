export interface ICreateOrder {
  comments: string;
  total: number;
  id_table: number;
  id_user: number;
  user_action: number;
  menus: IMenuOrder[];
}

export interface IMenuOrder {
  id_menu: number;
  price: number;
  quantity: number;
  sub_total: number;
}

export interface IResponseOrder {
  error: boolean;
  data: IListOrders[];
  code: number;
}

export interface IListOrders {
  id_order: number;
  comments: string;
  total: number;
  status: number;
  id_table: number;
  detail: IDetail[];
}

export interface IDetail {
  id_order: number;
  name: string;
  price: number;
  quantity: number;
  sub_total: number;
}

export interface IUpdateOrder {
  id_order: number;
  status: number;
  user_action: number;
}
