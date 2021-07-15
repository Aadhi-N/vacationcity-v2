import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Humidity } from "../../../../services/humidity/humidity";
import { HumidityService } from "../../../../services/humidity/humidity.service";


@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css', '../../input-form.component.css']
})
export class HumidityComponent implements OnInit {
  @Input() parent: FormGroup;
  @Input() submitted: boolean;
  @Input() formFields: (args: any) => void;

  humidity: Humidity[];
  humidityVal: number = 50;

  constructor(
    private humidityService: HumidityService
  ) { }

  ngOnInit() {
    this.getHumidity()
  }

  /* Display humidity values from GET request in services */
  getHumidity(): void {
    this.humidityService.getHumidity().subscribe(humidity => {this.humidity = humidity['results'];});
  };
 
  /* Interactive slider */
  humiditySlider(event): void {
    this.humidityVal = event;
  };

}
