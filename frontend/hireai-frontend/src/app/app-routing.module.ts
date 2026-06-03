import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RegisterComponent } from './register/register.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { StatCardComponent } from './stat-card/stat-card.component';
import { RecruiterDashboardComponent } from './recruiter-dashboard/recruiter-dashboard.component';


const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full' },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path : 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  {path : 'recruiter-dashboard', component: RecruiterDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
