export interface IParamsTable {
  name: string;
  number_table: number;
  capacity: number;
  user_action: number;
}

export interface IParamsEditTable {
  id_table: number;
  name: string;
  number_table: number;
  capacity: number;
  user_action: number;
}

export interface IResponseTables {
  error: boolean;
  data: IListTables[];
  code: number;
}

export interface IListTables {
  id_table: number;
  name: string;
  number_table: number;
  capacity: number;
  status: number;
}
