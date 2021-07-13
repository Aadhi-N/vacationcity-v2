import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  displaySearchResults: any = null;
  loadMap: boolean = false;
  activeCity: boolean = false;
  centerLat: number = 43.332987;
  centerLng: number = 11.939059;
  focusZoom: number = 2.1;
  previous: any;

  constructor(private data: DataService) { }

  displaySelectedCityCoords: any;
  
  ngOnInit() {
    this.data.searchResultMessage.subscribe(searchResult => {
      this.displaySearchResults = searchResult;
      console.log('SEARCH RESULTS FROM MAP', searchResult)
      this.renderMap(this.displaySearchResults);
    });

    this.data.searchCityCoordsMessage.subscribe(
      searchCityCoords => {(
        this.displaySelectedCityCoords = searchCityCoords); 
        this.changeSelectedCity(this.displaySelectedCityCoords);
        this.activeCity = true;
      });
  }

  renderMap(results) {
    results === undefined || results.length == 0 ? this.loadMap = false : this.loadMap = true;
  }

  clickedMarker(infoWindow) {
    if (this.previous) {
      this.previous.close();
    }
    this.previous = infoWindow;
    this.changeSelectedCity(infoWindow)
  }

  changeZoom(coordinates) {
    this.focusZoom = 10;
    this.centerLat = Number(coordinates.latitude);
    this.centerLng = Number(coordinates.longitude);
  }

  changeSelectedCity(searchCityCoords) {
    if (this.activeCity) {
      this.focusZoom = 10;
      this.centerLat = searchCityCoords.lat;
      this.centerLng = searchCityCoords.lng;
    }
  }

}
