import { Component } from '@angular/core';
import { MainPage } from '../main/main';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = MainPage;
  constructor() {

  }
}
