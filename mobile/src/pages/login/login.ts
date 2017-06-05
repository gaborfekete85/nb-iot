import { Component } from '@angular/core';
// , ViewChild, ElementRef
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MainPage } from '../main/main';
import { FacebookAuth } from '@ionic/cloud-angular';
// , User
// import { Geolocation } from 'ionic-native';

import { FacebookUsers } from '../../providers/facebook-users';
import { FBUser } from '../../models/FBUser';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loading: Loading;
  userName;
  user : FBUser;
  accessToken : string;
  loggedInUser : FBUser;

  constructor(public facebookAuth: FacebookAuth, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController
    , public facebookUsers: FacebookUsers
  ) {
    console.log("The application showed up !");

    //alert('The application showed up with ' + facebookUsers.tryLogin().name + ' !');
    //facebookUsers.tryLogin();
    //this.loginWithAuth();
    this.login();

    this.nav.push(MainPage);
  }

  public createAccount() {
    this.nav.push(HomePage);
  }

  public login() {
    Facebook.login(['email']).then((response:FacebookLoginResponse) => {
      this.nav.push(MainPage);
    //  Facebook.getAccessToken().then((v) => {
    //    this.accessToken = v;
    //    Facebook.api("/me?fields=id%2Cname&access_token="+this.accessToken, ['public_profile'])
    //    .then((profile) => {
    //        alert('Logged in as ' + profile.name);
    //        //this.loggedInUser.id = profile.id;
    //        //this.loggedInUser.name = profile.name;
    //        this.nav.push(MainPage);
    //      });
    //  });
    });
  }

  public loginWithAuth() {
    this.facebookAuth.login().then(() => {
      //this.showError("Logged in as " + this.user.social.facebook.data.full_name);
      //this.userName = this.user.social.facebook.data.full_name;
      this.nav.push(MainPage);
    });
  }

  public logout() {
    this.facebookAuth.logout();
    //this.facebookAuth.logout().then(() => {
    //  this.showError("Logged out " + this.user.social.facebook.data.full_name);
      this.userName = undefined;
    //});
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

};
