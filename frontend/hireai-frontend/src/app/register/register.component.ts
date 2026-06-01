import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  role: 'candidate' | 'recruiter' = 'candidate';

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: ''
  };

  constructor(
    private readonly router: Router,
    private readonly registerService: RegisterService
  ) {}

  submit(): void {

    const payload = {
      ...this.formData,
      role: this.role.toUpperCase() as 'CANDIDATE' | 'RECRUITER'
    };

    this.registerService.register(payload).subscribe({
      next: () => {
        this.router.navigate(['/verify-email']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Registration failed');
      }
    });
  }

}
