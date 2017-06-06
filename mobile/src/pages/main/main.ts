import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { LocatorService } from '../../providers/LocatorService';
import { Http } from '@angular/http';
import { Coordinate } from "../../domain/coordinate";
import { Observable } from "rxjs/Observable";
import { Push, PushToken } from '@ionic/cloud-angular';

declare var google;

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
  providers : [LocatorService]
})
export class MainPage {
  userName : string;
  longitude = 10;
  latitude = 20;
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public coords:Coordinate[];
  markers = [];
  token : string;


  constructor(private locatorService : LocatorService, public http: Http, private nav : NavController, private push: Push) {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:' + t.token);
      this.token = t.token;
    });

    this.push.rx.notification()
      .subscribe((msg) => {
        alert(msg.title + ': ' + msg.text);
      });

    this.loadMap();
    this.updateCoords();
    setInterval(() => { this.updateCoords(); }, 5000);
  }

  handleError(error) {
    console.error(error);
    //alert("Error: " + error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public updateCoords() {
    Geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      this.locatorService.save('Gaben-Device', this.longitude, this.latitude)
        .subscribe(data => {
          this.coords = data;
          this.addMarker();
        });
    }).catch((error) => {
      //alert('Error occured' + error);
      console.log('Error getting location', error);
    });
    // this.refreshMarkers();
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
      // this.addMarker();
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
    this.removeMarkers();
    for (var i = 0; i < this.coords.length; i++) {
      let marker = new google.maps.Marker({
        map: this.map,
        // animation: google.maps.Animation.BOUNCE,
        position: new google.maps.LatLng(this.coords[i].latitude,this.coords[i].longitude)
      });
      this.markers.push(marker);
      let content = "<h4>"+ this.coords[i].deviceId + "</h4>";
      this.addInfoWindow(marker, content);
    }
  }

  removeMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }

  refreshMarkers() {
    this.removeMarkers();
    this.addMarker();
  }

  // Sets the map on all markers in the array.
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }
};
