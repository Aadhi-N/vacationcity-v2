import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from "./in-memory-data.service";

import { AppRoutingModule } from './app-routing.module';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { MessagesComponent } from './messages/messages.component';
import { InputFormComponent } from './input-form/input-form.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';

import { AgmCoreModule } from '@agm/core';
import { LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral } from '@agm/core/services'

// import { apikey } from './apikey';

import { environment } from "../environments/environment";
import { MonthsComponent } from './input-form/components/months/months.component';
import { TemperaturesComponent } from './input-form/components/temperatures/temperatures.component';
import { HumidityComponent } from './input-form/components/humidity/humidity.component';

@Injectable()
   export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
    apiKey: string = environment.google_maps_key;
   }


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    MessagesComponent,
    InputFormComponent,
    SearchResultsComponent,
    FooterComponent,
    MapComponent,
    MonthsComponent,
    TemperaturesComponent,
    HumidityComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    //   ),
    AgmCoreModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [
    {provide: LAZY_MAPS_API_CONFIG, useClass: GoogleMapsConfig}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }




