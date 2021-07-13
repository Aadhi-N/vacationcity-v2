import { Component } from '@angular/core';
import { ViewportScroller } from "@angular/common";
import { Router } from "@angular/router";

import { DataService } from "../services/data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})

export class AppComponent {  
  loadForm: boolean = false;
  loadResults: boolean = false;
  yes: boolean = false;

  constructor(private data: DataService, private scroller: ViewportScroller, private router: Router) { }

  ngOnInit() {}

  public loadComponent(value: string) {
    this[value] = !this[value];
  };

  public navigateTo(element: string) {
    // this.router.navigate([], { fragment: element });
    this.yes = true;
      document.getElementById(element).scrollIntoView({
        behavior: "smooth",
      });
      
    
    // this.scroller.scrollToAnchor(element);
  }
  

}