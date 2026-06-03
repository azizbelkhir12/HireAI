import { Component } from '@angular/core';
import { applicants, applicationsChart, interviews, jobs, recruiterStats } from '../data';

@Component({
  selector: 'app-recruiter-dashboard',
  standalone: false,
  templateUrl: './recruiter-dashboard.component.html',
  styleUrl: './recruiter-dashboard.component.css'
})
export class RecruiterDashboardComponent {
  stats = recruiterStats;
  chart = applicationsChart;
  applicants = applicants.slice(0, 4);
  interviews = interviews;
  jobs = jobs.slice(0, 3);
  top = applicants[0];
}
