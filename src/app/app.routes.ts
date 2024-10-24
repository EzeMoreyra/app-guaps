import { Routes } from '@angular/router';
import { TabsHomePage } from './pages/tabs-home/tabs-home.page';
import { authGuard } from './guards/auth-guard.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login-form',
    pathMatch: 'full',
  },
  {
    path: 'register-form',
    loadComponent: () => import('./pages/auth/register-form/register-form.page').then( m => m.RegisterFormPage)
  },
  {
    path: 'login-form',
    loadComponent: () => import('./pages/auth/login-form/login-form.page').then( m => m.LoginFormPage)
  },
  {
    path: 'tabs-home',
    canActivate: [authGuard],
    component: TabsHomePage,
    children:[
      {
        path: '',
        redirectTo: 'tab-uno',
        pathMatch: 'full',
      },
      {
        path: 'tab-uno',
        loadComponent: () => import('./pages/tabs-home/tab-uno/tab-uno.page').then( m => m.TabUnoPage)
      },
      {
        path: 'tab-dos',
        loadComponent: () => import('./pages/tabs-home/tab-dos/tab-dos.page').then( m => m.TabDosPage)
      },
      {
        path: 'tab-tres',
        loadComponent: () => import('./pages/tabs-home/tab-tres/tab-tres.page').then( m => m.TabTresPage)
      },
      {
        path: 'tab-cuatro',
        loadComponent: () => import('./pages/tabs-home/tab-cuatro/tab-cuatro.page').then( m => m.TabCuatroPage)
      }
      
    ]
  },
  {
    path: 'mascotas/agregar',
    //canActivate: [authGuard],
    loadComponent: () => import('./pages/mascotas/agregar-mascota/agregar-mascota.page').then(m => m.AgregarMascotaPage)
  },
  
  {
    path: 'mascota/:id',
  loadComponent: () =>
    import('./pages/mascotas/mostrar-mascotas/mostrar-mascota.page').then(
      (m) => m.MostrarMascotaPage
    ),
  },
  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then( m => m.CameraPage)
  },


  
  
];
