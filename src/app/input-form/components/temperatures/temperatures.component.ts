import { Component, OnInit } from '@angular/core';

import { Temp } from "../../../../services/temp/temp";
import { TempService } from "../../../../services/temp/temp.service";

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css', '../../input-form.component.css']
})
export class TemperaturesComponent implements OnInit {

  temps: Temp[];
  selectedTemp: number = null;
  tempRange: any = {
    high: 50,
    low: -50,
    mid: 0
  };

  constructor(
    private tempService: TempService,
  ) { }

  ngOnInit() {
    this.getTemps();
  }

  getTemps(): void {
    this.tempService.getTemps().subscribe(temps => {
      this.temps = temps;
    });
  }

  tempSlider(event) {
    this.selectedTemp = event;
    // this.isTempValue = true;
  }

}
