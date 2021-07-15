import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Temp } from "../../../../services/temp/temp";
import { TempService } from "../../../../services/temp/temp.service";

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css', '../../input-form.component.css']
})
export class TemperaturesComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() submitted: boolean;
  @Input() formFields: (args: any) => void;

  temps: Temp[];
  selectedTemp: number = null;
  tempRange: any = {
    high: 50,
    low: -50,
    mid: 0
  };

  metric: any = {
    celciusActive: true,
    fahrenheitActive: false
  }

  constructor(
    private tempService: TempService,
  ) { }

  ngOnInit() {
    this.getTemps();
  }

  /* Display temperatures from GET request in services */
  getTemps(): void {
    this.tempService.getTemps().subscribe(temps => {
      this.temps = temps;
    });
  }

  /* Interactive slider */
  tempSlider(event) {
    this.selectedTemp = event;
  };

  /* Toggle between celcius and farenheit on slider */
  setMetric(event) {
    let x = this.metric;
    Object.keys(x).forEach( function (key) {
      x[key] = key === event
    })
    this.convertMetric();
  }

  /* Adjust slider range + values to metric version */
  convertMetric() { 
    if (this.metric.celciusActive) {
      return this.tempRange = {
        high: (this.temps['results'][0].high - 32) * 5 / 9,
        low: (this.temps['results'][0].low - 32) * 5 / 9,
        mid: 0
      }, this.selectedTemp = 0;

    } else {
      return this.tempRange = {
        high: this.temps['results'][0].high,
        low: this.temps['results'][0].low,
        mid: 0
      }, this.selectedTemp = 34;
    }
  };

};
