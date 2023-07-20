import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { UserProfileTabComponent } from './components/user-profile-tab/user-profile-tab.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserProfileTabComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileUiLibRoutingModule { }
