import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DataService } from "../../services/data/data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare var $: any;

/* Import models and services */
import { Month } from "../../services/month/month";

import { City } from "../../services/city/city";
import { CityService } from "../../services/city/city.service";

import { CityCoord } from "../../services/city-coord/cityCoord";
import { CityCoordService } from "../../services/city-coord/city-coord.service";

import { Temp } from "../../services/temp/temp";

import { Humidity } from "../../services/humidity/humidity";


@Component({
  selector: "app-input-form",
  templateUrl: "./input-form.component.html",
  styleUrls: ["./input-form.component.css"]
})
export class InputFormComponent implements OnInit {
  /* Send to parent - load component on click and smooth scroll */
  @Output() onButtonClick = new EventEmitter<string>();
  @Output() Navigate = new EventEmitter<string>();

  registerForm: FormGroup;
  registerInputForm: FormGroup;
  submitted = false;


  months: Month[];
  cities: City[];
  temps: Temp[];

  humidity: Humidity[];

  selectedMonth: number = null;
  selectedMonthName: string;
  selectedTemp: number = null;
  convertedTemp: number = null;
  selectedHumidity: number = null;
  submitData: any[];

  filteredMonth: any[];

  celciusActive: boolean = true;
  fahrenheitActive: boolean = false;

  filteredSearchResults: any;
  displaySearchResults: any;
  displaySearchQuery: any;

  constructor(
    private cityService: CityService,
    private data: DataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getCities(); //get list of cities to filter through

    /* Register form validation, pass values to children */
    this.registerInputForm = this.formBuilder.group({
      selectedMonthID: ['', Validators.required],
      selectedTemp: ['', Validators.required],
      selectedHumidity: ['', Validators.required]
    })
  };

  ngAfterViewInit() {
    this.data.searchResultMessage.subscribe(
      searchResult => (this.displaySearchResults = searchResult)
    );

    this.data.searchQueryMessage.subscribe(
      searchQuery => (this.displaySearchQuery = searchQuery)
    );
  };

   /* Convenience method for easy access to form fields */
   formFields() { return this.registerInputForm.controls; }

   /* Handle form validation */
   onSubmit() {
    this.submitted = true;
    if (this.registerInputForm.invalid) {return} //stop here if form is invalid

    this.getCities();
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerInputForm.value))
  }

  /* Emit event to parent to toggle smooth scroll */
  public navigateTo(element: string) {
    this.Navigate.emit(element)
  };

  /* Emit event to parent to display search results component */
  public handleClick(value: string) {
    this.onButtonClick.emit(value);
  };

  /* Display list of cities from GET request in services; create new array by merging APIs */
  getCities(): void {
    this.cityService.getCities().subscribe(cities => { //get list of cities
      let cityNamesAPI = cities[0]; //https://vacationcity.herokuapp.com/api/cities
      let cityTempsAPI = cities[1]; //https://vacationcity.herokuapp.com/api/citytemps
      let cityCoordsAPI = cities[2]; //https://vacationcity.herokuapp.com/api/citycoords

      for (let cityName of cityNamesAPI.results) { 
        let cityTempArray = cityTempsAPI.results.filter(cityTemp => { 
        // Match and merge temperatures from city temps API to city API in array format
        if (cityName.cityID == cityTemp.city_id) {
              return cityTemp;
            }
        });
        cityName.city_temp = cityTempArray;
        
        // Match and merge coordinates from city coordinates API to city API in array format
        let cityCoordArray = cityCoordsAPI.results.filter(cityCoords => {
          if (cityName.cityID == cityCoords.city_id) {
              return cityCoords;
            }
          });
        cityName.city_coords = cityCoordArray;
      };

    // Set new merged array of APIs to variable
    this.cities = cities[0].results;
    });
  };

  onMonthClick(event): void {
    this.selectedMonth = event.target.value;
    this.selectedMonthName = this.months[event.target.value - 1].monthName;
  }

  displaySearchParams() {
    /* sending search query params to other components */

    this.data.changeSearchQueryMessage([
      {
        monthQuery: this.selectedMonthName,
        tempQuery: this.selectedTemp,
        humidityQuery: this.selectedHumidity,
        metricQuery: this.celciusActive === true? "Celcius" : "Fahrenheit",
        celciusActive: this.celciusActive,
        fahrenheitActive: this.fahrenheitActive
      }
    ]);
  }


  displayResults(results) {
    this.data.changeSearchResultMessage(results);
  }

  validateMetric() {
    if (this.fahrenheitActive === true) {
      this.convertedTemp = this.selectedTemp
      this.performQuery(this.convertedTemp);
    } else {
        this.convertedTemp = this.selectedTemp * 9 / 5 + 32;
        this.performQuery(this.convertedTemp)
    }
  }

  /* Method to filter cities based on user input: selected month, temps, and humidity */
  performQuery(convertedTemp) {
    let filteredCities = [];
    let cityResults = [];

    // iterate over all cities;
    //cityTemp = get all city temps based on selected month
    // if avg farenheigt and humidity fall within deviation of +-10
    // eg. 
    for (let i = 0; i < this.cities.length; i++) {
      let cityFilteredByMonthAndTemps: any = this.cities[i].city_temp[this.selectedMonth - 1];

      if (
        !(
          Number(cityFilteredByMonthAndTemps.avgFahrenheit) < convertedTemp + 10 &&
          Number(cityFilteredByMonthAndTemps.avgFahrenheit) > convertedTemp - 10
        )
      )
        continue;

      if (
        !(
          Number(cityFilteredByMonthAndTemps.avgHumidity) < this.selectedHumidity + 10 &&
          Number(cityFilteredByMonthAndTemps.avgHumidity) > this.selectedHumidity - 10
        )
      )
        continue;

      filteredCities.push(cityFilteredByMonthAndTemps);
    };

    // Assign filtered results into new property
    for (let filteredCity of filteredCities) {
      cityResults.push({
        name: this.cities[filteredCity.city_id - 1].cityName,
        avgFahrenheit: filteredCity.avgFahrenheit,
        avgHumidity: filteredCity.avgHumidity,
        coordinates: this.cities[filteredCity.city_id - 1].city_coords[0]
      });
    }

    // ASSIGN PROPERTY TO MESSAGE SERVICE
    this.filteredSearchResults = cityResults;    
    this.displaySearchResults = this.filteredSearchResults;

    this.displaySearchParams();
    this.displayResults(this.displaySearchResults);
  }

};