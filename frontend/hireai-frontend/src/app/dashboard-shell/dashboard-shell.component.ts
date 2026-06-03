import { Component, Input } from '@angular/core';
import { Role } from '../data';

type NavItem = { label: string; path: string };

const navMap: Record<Role, NavItem[]> = {
  admin: [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Recruiters', path: '/admin/recruiters' },
    { label: 'Candidates', path: '/admin/candidates' },
    { label: 'Jobs', path: '/admin/jobs' },
    { label: 'Analytics', path: '/admin/analytics' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Settings', path: '/admin/settings' }
  ],
  recruiter: [
    { label: 'Dashboard', path: '/recruiter' },
    { label: 'Company Profile', path: '/recruiter/company' },
    { label: 'Job Posts', path: '/recruiter/jobs' },
    { label: 'Applicants', path: '/recruiter/applicants' },
    { label: 'Interviews', path: '/recruiter/interviews' },
    { label: 'Messages', path: '/recruiter/messages' },
    { label: 'Notifications', path: '/recruiter/notifications' },
    { label: 'Settings', path: '/recruiter/settings' }
  ],
  candidate: [
    { label: 'Dashboard', path: '/candidate' },
    { label: 'My Profile', path: '/candidate/profile' },
    { label: 'Resume / CV', path: '/candidate/resume' },
    { label: 'Find Jobs', path: '/candidate/jobs' },
    { label: 'Applied Jobs', path: '/candidate/applied' },
    { label: 'Interviews', path: '/candidate/interviews' },
    { label: 'Messages', path: '/candidate/messages' },
    { label: 'Notifications', path: '/candidate/notifications' },
    { label: 'Settings', path: '/candidate/settings' }
  ]
};

const roleMeta: Record<Role, { name: string; email: string; initials: string; badge: string }> = {
  admin: { name: 'Elena Rossi', email: 'admin@jobzen.ai', initials: 'ER', badge: 'Admin' },
  recruiter: { name: 'Sarah Chen', email: 'sarah@acme.io', initials: 'SC', badge: 'Recruiter' },
  candidate: { name: 'David Kim', email: 'david@orbit.app', initials: 'DK', badge: 'Candidate' }
};

@Component({
  selector: 'app-dashboard-shell',
  standalone: false,
  templateUrl: './dashboard-shell.component.html',
  styleUrl: './dashboard-shell.component.css'
})
export class DashboardShellComponent {
  @Input() role: Role = 'candidate';
  @Input() title = '';
  @Input() description = '';

  get nav(): NavItem[] {
    return navMap[this.role];
  }

  get me() {
    return roleMeta[this.role];
  }

}
