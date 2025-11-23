import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'bienvenida',
    pathMatch: 'full',
  },
  {
    path: 'vercarrito',
    loadComponent: () => import('./vercarrito/vercarrito.page').then( m => m.VercarritoPage)
  },
  {
    path: 'bienvenida',
    loadComponent: () => import('./bienvenida/bienvenida.page').then( m => m.BienvenidaPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registrarusuario',
    loadComponent: () => import('./registrarusuario/registrarusuario.page').then( m => m.RegistrarusuarioPage)
  },
  {
    path: 'vercatalogo',
    loadComponent: () => import('./vercatalogo/vercatalogo.page').then( m => m.VercatalogoPage)
  },
  {
    path: 'acercadenosotros',
    loadComponent: () => import('./acercadenosotros/acercadenosotros.page').then( m => m.AcercadenosotrosPage)
  },
  {
    path: 'registrarcomentario',
    loadComponent: () => import('./registrarcomentario/registrarcomentario.page').then( m => m.RegistrarcomentarioPage)
  },
  {
    path: 'registrarpedido',
    loadComponent: () => import('./registrarpedido/registrarpedido.page').then( m => m.RegistrarpedidoPage)
  },
  {
    path: 'verestadopedido',
    loadComponent: () => import('./verestadopedido/verestadopedido.page').then( m => m.VerestadopedidoPage)
  },
  {
    path: 'vercajadecomentarios',
    loadComponent: () => import('./vercajadecomentarios/vercajadecomentarios.page').then( m => m.VercajadecomentariosPage)
  },
  {
    path: 'registrarpago',
    loadComponent: () => import('./registrarpago/registrarpago.page').then( m => m.RegistrarpagoPage)
  },
  {
    path: 'verrecibo',
    loadComponent: () => import('./verrecibo/verrecibo.page').then( m => m.VerreciboPage)
  },
 /* {
    path: 'bienvenidaadmin',
    loadComponent: () => import('./bienvenidaadmin/bienvenidaadmin.page').then( m => m.BienvenidaadminPage)
  },*/
   {
     path: 'bienvenidaadmin',
     loadComponent: () => import('./bienvenidaadmin/bienvenidaadmin.page').then( m => m.BienvenidaadminPage)
   },
      // ... más rutas
  {
    path: 'estadisticas',
    loadComponent: () => import('./estadisticas/estadisticas.page').then( m => m.EstadisticasPage)
  },
  {
    path: 'verpedidos',
    loadComponent: () => import('./verpedidos/verpedidos.page').then( m => m.VerpedidosPage)
  },
  {
    path: 'mispostres',
    loadComponent: () => import('./mispostres/mispostres.page').then( m => m.MispostresPage)
  },

];
