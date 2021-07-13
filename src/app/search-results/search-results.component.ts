import { Component, OnInit, Input } from "@angular/core";
import { DataService } from "../data.service";
declare var $: any;

@Component({
  selector: "app-search-results",
  templateUrl: "./search-results.component.html",
  styleUrls: ["./search-results.component.css"]
})
export class SearchResultsComponent implements OnInit {
  /* FROM PARENT - HIDE COMPONENT UNTIL SUBMIT BUTTON CLICKED */
  @Input() resultsHidden: boolean;

  p: number = 1;
  displaySearchResults: any;
  displayCoordResults: any;
  displaySearchQuery: any;
  isResultsAvailable = true;
  displaySelectedCityCoords: any = {
    lat: null,
    lng: null
  }
  celciusActive: boolean;
  fahrenheitActive: boolean; 
  metric: string;
  toggleOn: string = "check";
  toggleOff: string = "uncheck";

  constructor(private data: DataService) {}

  ngOnInit() {
    this.specialCards(event);
    this.locateOnMaps(event);

    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
      this.validateResults();
      // console.log('SEARCH RESULTS', searchResult)
    });

    this.data.searchQueryMessage.subscribe(
      searchQuery => {this.displaySearchQuery = searchQuery;
      this.detectMetric();
      }
    );

    this.data.searchCityCoordsMessage.subscribe(
      searchCityCoords => {(this.displaySelectedCityCoords = searchCityCoords)}
    );
  }

  validateResults() {
    if (
      !Array.isArray(this.displaySearchResults) ||
      !this.displaySearchResults.length
    ) {
      this.isResultsAvailable = false;
    } else {
      this.isResultsAvailable = true;
    }
  }

  detectMetric() {
    if (this.displaySearchQuery[0].fahrenheitActive === true) {
      this.celciusActive = false;
      this.fahrenheitActive = true;
      this.metric = "Fahrenheit";
      $('.ui.checkbox').checkbox(this.toggleOn)

    } else {
      this.celciusActive = true;
      this.fahrenheitActive = false;
      this.metric = "Celcius";
      $('.ui.checkbox').checkbox(this.toggleOff)
    }
  }

  changeMetric(event) {
    this.celciusActive = !this.celciusActive
    this.fahrenheitActive = !this.fahrenheitActive
    this.celciusActive ? this.metric = "Celcius" : this.metric = "Fahrenheit";
    this.changeTempValue();
  }

  changeTempValue() {
    if (this.celciusActive === true && this.displaySearchQuery[0].metricQuery === "Fahrenheit") {
      console.log('convert pls')

    } 
  }

  clearSearch() {
    this.displaySearchResults = null;
  }

  /* SEMANTIC UI - DIMS CARD IMAGE ON HOVER */
  specialCards(event) {
    $(".special.cards .image").dimmer({
      on: "hover"
    });
  }

  locateOnMaps(event) {
    if (event) {
      this.data.changeCityCoordsMessage(
        this.displaySelectedCityCoords = {
          lat: Number(event.latitude),
          lng: Number(event.longitude),
        }
      )
    }
  }
}