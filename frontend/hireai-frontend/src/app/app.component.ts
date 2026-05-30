import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hireai-frontend';

  constructor(private api: ApiService) {}
  
  ngOnInit() {
  this.api.getAll('api/test').subscribe(data => console.log(data));
}
}
