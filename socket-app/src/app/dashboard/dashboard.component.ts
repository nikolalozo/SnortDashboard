import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Alert } from '../alert'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  arr = [];
  alerts = [];
  top_src = [];
  top_date = [];
  top_prior = [];
  top_class = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.listen('alerts').subscribe((data: string[]) => {
      this.arr = data;
      this.update();
    })
  }

  update(): void {
    this.alerts = [];
    var arr_src = [];
    var arr_date = [];
    var arr_prior = [];
    var arr_class = [];
    for (var el of this.arr) {
      if (el) {
        try {
          let alert = <Alert>JSON.parse(el);
          this.alerts.unshift(alert);
          arr_src.push(alert.src_addr);
          arr_date.push(alert.timestamp.substring(0, 5));
          var pri = alert.priority.toString();
          var mapObj = {
            1: "Low",
            2: "Medium",
            3: "High",
            4: "Very High"
          };
          pri = pri.replace(/1|2|3|4/, function (matched) {
            return mapObj[matched];
          });
          arr_prior.push(pri);
          arr_class.push(alert.class);
          this.sort_src(arr_src);
          this.sort_date(arr_date);
          this.sort_prior(arr_prior);
          this.sort_class(arr_class);
        } catch (e) {
          alert(e);
        }
      }
    }
  }

  sort_src(arr_src): void {
    let hash = {};

    for (let el of arr_src) {
      if (!hash[el]) hash[el] = 0;
      hash[el]++;
    }
    const hashToArray = Object.entries(hash);
    const sortedArray = hashToArray.sort((a, b) => <any>b[1] - <any>a[1]);
    this.top_src = sortedArray.slice(0, 5);
  }

  sort_class(arr_class): void {
    let hash = {};

    for (let el of arr_class) {
      if (!hash[el]) hash[el] = 0;
      hash[el]++;
    }
    const hashToArray = Object.entries(hash);
    const sortedArray = hashToArray.sort((a, b) => <any>b[1] - <any>a[1]);
    this.top_class = sortedArray.slice(0, 5);
  }

  sort_prior(arr_prior): void {
    let hash = {};

    for (let el of arr_prior) {
      if (!hash[el]) hash[el] = 0;
      hash[el]++;
    }
    const hashToArray = Object.entries(hash);
    const sortedArray = hashToArray.sort((a, b) => <any>b[1] - <any>a[1]);
    this.top_prior = sortedArray.slice(0, 5);
  }

  sort_date(arr_date): void {
    let hash = {};

    for (let el of arr_date) {
      if (!hash[el]) hash[el] = 0;
      hash[el]++;
    }
    const hashToArray = Object.entries(hash);
    const sortedArray = hashToArray.sort((a, b) => <any>b[1] - <any>a[1]);
    this.top_date = sortedArray.slice(0, 5);
  }

  getPriority(prior) : string {
    var pri = prior.toString();
    var mapObj = {
      1: "Low",
      2: "Medium",
      3: "High",
      4: "Very High"
    };
    pri = pri.replace(/1|2|3|4/, function (matched) {
      return mapObj[matched];
    });
    return pri;
  }
}
