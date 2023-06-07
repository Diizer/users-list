import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UsersPageComponent } from './users-page/users-page.component';

const routes: Routes = [
  { path: '', component: UsersPageComponent },
  {
    path: ':userId',
    component: UserDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
