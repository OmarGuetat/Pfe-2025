import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';


export const routes: Routes = [
  { path: 'admin/home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'employee/home', component: EmployeeHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },  
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {} 