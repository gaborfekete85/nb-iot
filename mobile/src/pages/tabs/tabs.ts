import { Component } from '@angular/core';

// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { MainPage } from '../main/main';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = MainPage;
  tab2Root: any = LoginPage;
  //tab3Root: any = LoginPage;

  constructor() {

  }
}
