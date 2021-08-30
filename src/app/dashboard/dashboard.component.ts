import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  today: string = '';
  weekData: any;
  options: any;
  donData: any;

  constructor(private _datePipe: DatePipe) { }

  ngOnInit() {
    this.today = this._datePipe.transform(new Date(), 'mediumDate');

    this.weekData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      datasets: [
        {
          label: 'First data set',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [4, 7, 10, 0, 0]
        },
        {
          label: 'Second data set',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [8, 4, 12, 7, 17]
        }
      ]
    }

    this.options = {
      legend: {
        labels: {
          fontColor: "gray",
          fontSize: 14
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: "gray",
            fontSize: 14,
            stepSize: 1
            // beginAtZero: true
          }
        }],
        xAxes: [{
          ticks: {
            fontColor: "gray",
            fontSize: 14,
            stepSize: 1
            // beginAtZero: true
          }
        }]
      }
    }


    this.donData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Third data set',
          data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Fourth data set',
          data: [28, 48, 40, 19, 86, 27, 90, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#9CCC65'
        }
      ]
    }
  }

  ngOnDestroy() {
  }

}
