import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.css',
})
export class VerifyEmailComponent implements OnInit {
  email = '';
  otp = '';
  isLoading = false;

  constructor(
    private route: ActivatedRoute,

    private router: Router,

    private registerService: RegisterService,
  ) {}

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }

  verifyOtp(): void {
    if (!this.email || this.otp.length !== 6) {
      alert('Please enter the 6-digit code sent to your email');
      return;
    }

    this.isLoading = true;

    this.registerService.verifyOtp(this.email, this.otp).subscribe({
      next: () => {
        this.isLoading = false;

        alert('Email verified successfully');

        this.router.navigate(['/login']);
      },

      error: (err) => {
        this.isLoading = false;

        alert(err?.error?.message || 'Invalid OTP');
      },
    });
  }
}
