import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { FacebookAuth, User } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public facebookAuth: FacebookAuth, public user: User) {
  }

}
