import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'news-list',
    loadComponent: () => import('./pages/news-list/news-list.page').then( m => m.NewsListPage)
  },
  {
    path: 'news-detail/:id',
    loadComponent: () => import('./pages/news-detail/news-detail.page').then( m => m.NewsDetailPage)
  },
  {
    path: 'news-create',
    loadComponent: () => import('./pages/news-create/news-create.page').then( m => m.NewsCreatePage)
  },
  {
    path: 'news-search',
    loadComponent: () => import('./pages/news-search/news-search.page').then( m => m.NewsSearchPage)
  },
  {
    path: 'categories',
    loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
  },
  {
    path: 'category-create',
    loadComponent: () => import('./pages/category-create/category-create.page').then( m => m.CategoryCreatePage)
  },
  {
    path: 'my-favorites',
    loadComponent: () => import('./pages/my-favorites/my-favorites.page').then( m => m.MyFavoritesPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
];
