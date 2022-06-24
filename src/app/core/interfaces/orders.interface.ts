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
