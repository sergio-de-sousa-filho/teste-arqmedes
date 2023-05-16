import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './modules/shared/guards/auth.guard';

const routes: Routes = [
  { 
    path: 'auth', 
    loadChildren: () => import('./modules/auth/auth-routing.module').then(m => m.AuthRoutingModule)  
  },
  { 
    path: 'users', 
    loadChildren: () => import('./modules/users/users-routing.module').then(m => m.UsersRoutingModule),
    canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
