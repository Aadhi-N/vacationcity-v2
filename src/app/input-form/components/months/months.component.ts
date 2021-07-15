import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/* Import models and services */
import { Month } from "../../../../services/month/month";
import { MonthService } from "../../../../services/month/month.service";


@Component({
  selector: 'app-months',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.css']
})
export class MonthsComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() submitted: boolean;
  @Input() formFields: (args: any) => void;
 
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
