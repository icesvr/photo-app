import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { PhotoComponent } from './components/photo/photo.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component : SigninComponent
  },{
    path : 'signup',
    component : SignupComponent
  },{
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'profile/:id',
    component : ProfileComponent
  },
  {
    path : 'profile/:id/:photo',
    component : ProfileComponent
  },
  {
    path : 'newuser',
    component : EditprofileComponent,
    canActivate : [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
