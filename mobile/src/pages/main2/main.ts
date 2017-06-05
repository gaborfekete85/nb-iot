import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { Geolocation } from 'ionic-native';
import { FacebookUsers } from '../../providers/facebook-users';
import { FBUser } from '../../models/FBUser';
import { Facebook, FacebookLoginResponse } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  loading: Loading;
  userName;
  longitude = 0;
  latitude = 0;
  currentUser : FBUser;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public facebookAuth: FacebookAuth, public user: User, private nav: NavController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private facebookUsers: FacebookUsers) {
    console.log("The application showed up !");
    //this.getCoords();
    //this.login();
    Facebook.login(['email']).then((response:FacebookLoginResponse) => {
      Facebook.getAccessToken().then((v) => {
        Facebook.api("/me?fields=id%2Cname&access_token="+v, ['public_profile'])
          .then((profile) => {
            this.userName = profile.name;
            this.currentUser.name = profile.name;
            alert('Main Page: ' + this.userName);
          })
          .catch((error) => {
            console.log("Unable to login with facebbok");
          });
      });
    });
  }

  getUserDetail() {
    //this.currentUser = this.facebookUsers.searchUsers("Gaben");
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((resp) => {
    let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  public getCoords() {
    Geolocation.getCurrentPosition().then((resp) => {
      console.log("Latitude: " + resp.coords.latitude);
      console.log("Longitude: " + resp.coords.longitude);
      this.longitude = resp.coords.latitude;
      this.latitude = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addMarker(){

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });

    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }

  public createAccount() {
    this.nav.push(HomePage);
  }

  //public login() {
  //  this.facebookAuth.login().then(() => {
  //    //this.showError("Logged in as " + this.user.social.facebook.data.full_name);
  //    this.userName = this.user.social.facebook.data.full_name;
  //  });
  //}

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
