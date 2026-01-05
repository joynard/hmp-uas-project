import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

  // --- TABS UTAMA ---
  {
    path: 'app',
    loadComponent: () => import('./tabs/tabs.page').then( m => m.TabsPage),
    children: [
      // 1. HOME: Halaman Highlights / Dashboard
      {
        path: 'home', 
        loadComponent: () => import('./home/home.page').then( m => m.HomePage)
      },
      // 2. NEWS: Halaman Full List Berita (Akses via Sidebar)
      {
        path: 'news', 
        loadComponent: () => import('./pages/news-list/news-list.page').then( m => m.NewsListPage)
      },
      // 3. Tab Lainnya
      {
        path: 'categories',
        loadComponent: () => import('./pages/categories/categories.page').then( m => m.CategoriesPage)
      },
      {
        path: 'search',
        loadComponent: () => import('./pages/news-search/news-search.page').then( m => m.NewsSearchPage)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./pages/my-favorites/my-favorites.page').then( m => m.MyFavoritesPage)
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
      },
      {
        path: '',
        redirectTo: '/app/home',
        pathMatch: 'full'
      }
    ]
  },

  // --- PAGES DI LUAR TABS ---
  {
    path: 'news-detail/:id',
    loadComponent: () => import('./pages/news-detail/news-detail.page').then( m => m.NewsDetailPage)
  },
  {
    path: 'news-create',
    loadComponent: () => import('./pages/news-create/news-create.page').then( m => m.NewsCreatePage)
  },
  {
    path: 'category-create',
    loadComponent: () => import('./pages/category-create/category-create.page').then( m => m.CategoryCreatePage)
  },
  {
    path: 'news-category/:id',
    loadComponent: () => import('./pages/news-category/news-category.page').then( m => m.NewsCategoryPage)
  },
];