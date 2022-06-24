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
  /*=====  End of APIS POST method  ======*/

  /*=============================================
  =            APIS GET method            =
  =============================================*/
    getRoles = '/api/get/roles',
    getUsers = '/api/get/users',
    getTables = '/api/get/table',
  /*=====  End of APIS GET method  ======*/
}
