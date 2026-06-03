import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../data';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  role: 'RECRUITER' | 'CANDIDATE' | 'ADMIN' = 'RECRUITER';

  footerLinks: any;

  formData = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  submit(): void {
    this.authService.login(this.formData).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);

        const role = response.role.toLowerCase();

        if (role === 'admin') {
          console.log('Navigating to admin dashboard');
          //this.router.navigate(['/admin']);
        } else if (role === 'recruiter') {
          console.log('Navigating to recruiter dashboard');
          //this.router.navigate(['/recruiter']);
        } else {
          console.log('Navigating to candidate dashboard');
          //this.router.navigate(['/candidate']);
        }
      },

      error: (err) => {
        alert(err?.error?.message || 'Login failed');
      },
    });
  }
}
