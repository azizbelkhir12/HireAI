import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  role: 'candidate' | 'recruiter' = 'candidate';

  isLoading = false;

  footerLinks = [
    { title: 'Product', links: ['Features', 'Pricing', 'Integrations', 'Changelog'] },
    { title: 'Company', links: ['About', 'Customers', 'Careers', 'Contact'] },
    { title: 'Resources', links: ['Blog', 'Help center', 'Security', 'Status'] },
  ];

  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    company: '',
  };

  constructor(
    private readonly router: Router,
    private readonly registerService: RegisterService,
  ) {}

  submit(): void {
    if (
      !this.formData.email ||
      !this.formData.password ||
      !this.formData.firstName ||
      !this.formData.lastName
    ) {
      alert('Please fill all fields');
      return;
    }

    this.isLoading = true;

    const payload = {
      ...this.formData,
      role: this.role.toUpperCase() as 'CANDIDATE' | 'RECRUITER',
    };

    this.registerService.register(payload).subscribe({
      next: () => {
        this.isLoading = false;

        this.router.navigate(['/verify-email'], {
          queryParams: {
            email: this.formData.email,
          },
        });
      },

      error: (err) => {
        this.isLoading = false;

        console.error(err);

        alert(err?.error?.message || 'Registration failed');
      },
    });
  }
}
