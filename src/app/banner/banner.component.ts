import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Output() onButtonClick = new EventEmitter<string>(); 
  @Output() Navigate = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {}

  public handleClick(value: string) {
    this.onButtonClick.emit(value);
  };

  public navigateTo(element: string) {
    this.Navigate.emit(element)
  };

};
