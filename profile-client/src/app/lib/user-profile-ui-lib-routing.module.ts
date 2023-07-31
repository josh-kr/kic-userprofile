import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './user-profile-tab/profile/profile.component';
import { SubscriptionsComponent } from './user-profile-tab/subscriptions/subscriptions.component';
import { UserProfileTabComponent } from './user-profile-tab/user-profile-tab.component';

const routes: Routes = [
   
  {
    path: '',
    component: UserProfileTabComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    children:[

      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        
      },
      {
        path: 'subscriptions',
        component: SubscriptionsComponent,
        canActivate: [AuthGuard],
        
      },
    ]
  },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserProfileUiLibRoutingModule { }
