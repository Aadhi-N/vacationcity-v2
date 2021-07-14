import { Component, OnInit } from '@angular/core';

/* Import models and services */
import { Month } from "../../../../services/month/month";
import { MonthService } from "../../../../services/month/month.service";


@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {

  months: Month[];


  constructor(
    private monthService: MonthService
  ) { }

  ngOnInit() {
    this.getMonths();
  }

  /* Display list of months from service's GET request */
  getMonths(): void {
    this.monthService.getMonths().subscribe(months => {(this.months = months['results'])});
  }

}
