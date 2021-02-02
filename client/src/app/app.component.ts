import { Component } from '@angular/core';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'socket-app';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
  }
}
