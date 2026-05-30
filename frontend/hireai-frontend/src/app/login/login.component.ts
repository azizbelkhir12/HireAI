import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../data';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: Role = 'recruiter';

  constructor(private readonly router: Router) {}

  submit(): void {
    void this.router.navigate([this.role === 'admin' ? '/admin' : this.role === 'recruiter' ? '/recruiter' : '/candidate']);
  }
}
