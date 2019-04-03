import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  public isCollapsed = false;
  constructor() { }

  ngOnInit() {
  }

}
