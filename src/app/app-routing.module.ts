import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  // administrador
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/admin/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/admin/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'tables',
    loadChildren: () => import('./pages/admin/tables/tables.module').then( m => m.TablesPageModule)
  },
  {
    path: 'menus',
    loadChildren: () => import('./pages/admin/menus/menus.module').then( m => m.MenusPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./pages/admin/orders/orders.module').then( m => m.OrdersPageModule)
  },
  // operativo
  {
    path: 'home',
    loadChildren: () => import('./pages/operational/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tables-list',
    loadChildren: () => import('./pages/operational/tables-list/tables-list.module').then( m => m.TablesListPageModule)
  },
  {
    path: 'menus-list',
    loadChildren: () => import('./pages/operational/menus-list/menus-list.module').then( m => m.MenusListPageModule)
  },
  {
    path: 'orders-list',
    loadChildren: () => import('./pages/operational/orders-list/orders-list.module').then( m => m.OrdersListPageModule)
  },
  {
    path: 'select-table',
    loadChildren: () => import('./pages/operational/createOrder/select-table/select-table.module').then( m => m.SelectTablePageModule)
  },
  {
    path: 'select-menus',
    loadChildren: () => import('./pages/operational/createOrder/select-menus/select-menus.module').then( m => m.SelectMenusPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
