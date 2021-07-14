import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Humidity } from "../../../../services/humidity/humidity";
import { HumidityService } from "../../../../services/humidity/humidity.service";


@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
  styleUrls: ['./humidity.component.css', '../../input-form.component.css']
})
export class HumidityComponent implements OnInit {

  humidity: Humidity[];
  selectedHumidity: number = null;
  isHumidityValue: boolean = false;

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
    this.selectedHumidity = event;
    // this.isHumidityValue = true;
  }

}
