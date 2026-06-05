import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';
import Swal from 'sweetalert2';

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
    {
      title: 'Product',
      links: ['Features', 'Pricing', 'Integrations', 'Changelog'],
    },
    { title: 'Company', links: ['About', 'Customers', 'Careers', 'Contact'] },
    {
      title: 'Resources',
      links: ['Blog', 'Help center', 'Security', 'Status'],
    },
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
      Swal.fire({
        icon: 'warning',
        title: 'Missing fields',
        text: 'Please fill all fields',
        confirmButtonText: 'OK',
      });

      return;
    }

    this.isLoading = true;

    const payload = {
      ...this.formData,
      role: this.role.toUpperCase() as 'CANDIDATE' | 'RECRUITER',
    };

    this.registerService.register(payload).subscribe({
      next: (response) => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: 'Registration successful',
          text:
            response?.message || 'Your account has been created successfully',
          confirmButtonText: 'Go to Login',
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },

      error: (err) => {
        this.isLoading = false;

        console.error(err);

        Swal.fire({
          icon: 'error',
          title: 'Registration failed',
          text: err?.error?.message || 'Something went wrong',
          confirmButtonText: 'Try Again',
        });
      },
    });
  }
}
