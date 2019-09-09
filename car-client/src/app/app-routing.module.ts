import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartingPageComponent } from './home/starting-page/starting-page.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LogoutComponent } from './core/logout/logout.component';
import { AuthGuard } from './auth.guard';
import { CarListingsComponent } from './pages/car-listings/car-listings.component';
import { AuthResolve } from './services/auth.resolve';

const routes: Routes = [
  {
    path: '',
    component: StartingPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    // resolve: {
    //   auth: AuthResolve
    // },
    // canActivate: [AuthGuard]
  },
  {
    path: 'cars',
    component: CarListingsComponent,
    resolve: {
      auth: AuthResolve
    },
    canLoad: [AuthGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
