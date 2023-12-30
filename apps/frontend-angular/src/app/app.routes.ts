import { Routes } from '@angular/router';

export const RouteMap = {
  HomePage: {
    getPath() {
      return "/";
    },
    path: "",
  },
  DashboardPage: {
    getPath() {
      return "/dashboard";
    },
    path: "dashboard",
  },
  AuthPage: {
    getPath(authType: "register" | "login") {
      return `/auth/${authType}`;
    },
    path: "auth/:authType",
  },
};

export const routes: Routes = [
  {
    path: RouteMap.HomePage.path,
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: RouteMap.DashboardPage.path,
    loadComponent: () =>
      import('./pages/dashboard/dashboard.page').then((m) => m.DashboardPage),
  },
  {
    path: RouteMap.AuthPage.path,
    loadComponent: () =>
      import('./pages/auth/auth.page').then((m) => m.AuthPage),
  },
];
