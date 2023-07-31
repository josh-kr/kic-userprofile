import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { UserProfileTabComponent } from './lib/user-profile-tab/user-profile-tab.component';
import { AuthGuard } from './lib/guards/auth.guard';
import { LoginComponent } from './lib/common/login/login.component';
import { Error404pageComponent } from './lib/common/error404page/error404page.component';

const routes: Routes = [

  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },  
  {
    path: '',
    loadChildren: './lib/user-profile-ui-lib.module#UserProfileUiLibModule',
    canActivate: [AuthGuard],
  },
  { path: '**', component: Error404pageComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
