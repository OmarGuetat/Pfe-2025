import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';


import { EmployeeHomeComponent } from './employee/employee-home/employee-home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth.guard';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HrHomeComponent } from './hr/hr-home/hr-home.component';
import { AccountantHomeComponent } from './accountant/accountant-home/accountant-home.component';
import { UsersDashboardComponent } from './admin/users-dashboard/users-dashboard.component';
import { LeaveDashboardComponent } from './admin/leave-dashboard/leave-dashboard.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


export const routes: Routes = [
  { path: 'admin-home', component: AdminHomeComponent, canActivate: [AuthGuard] },
  { path: 'admin/users-dashboard', component: UsersDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/leave-dashboard', component: LeaveDashboardComponent, canActivate: [AuthGuard] },
  { path: 'employee-home', component: EmployeeHomeComponent, canActivate: [AuthGuard] },
  { path: 'hr-home', component: HrHomeComponent, canActivate: [AuthGuard] },
  { path: 'accountant-home', component: AccountantHomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },  
  { path: 'reset-password', component: ResetPasswordComponent,canActivate: [AuthGuard] }, 
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {} 