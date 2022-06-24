export enum EndPoint {
  /*=============================================
  =            APIS POST method            =
  =============================================*/
    login = '/api/login',
    createUser = '/api/create/users',
    editUser = '/api/edit/users',
    deleteUser = '/api/delete/users',
    createTable = '/api/create/table',
    editTable = '/api/edit/table',
    deleteTable = '/api/delete/table',
    createMenu = '/api/create/menu',
    editMenu = '/api/edit/menu',
    deleteMenu = '/api/delete/menu',
    editOrder = '/api/update/status/ordenes',
    createOrder = '/api/create/ordenes',
  /*=====  End of APIS POST method  ======*/

  /*=============================================
  =            APIS GET method            =
  =============================================*/
    getRoles = '/api/get/roles',
    getUsers = '/api/get/users',
    getTables = '/api/get/table',
    getMenus = '/api/get/menu',
    getOrders = '/api/get/ordenes',
  /*=====  End of APIS GET method  ======*/
}
