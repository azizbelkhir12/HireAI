import { Component } from '@angular/core';
import { applicants } from '../data';

@Component({
  selector: 'app-recruiter-applicants',
  standalone: false,
  templateUrl: './recruiter-applicants.component.html',
  styleUrl: './recruiter-applicants.component.css'
})
export class RecruiterApplicantsComponent {

   applicants = applicants;
  selected = applicants[0];

}
