import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Coordinate} from '../domain/coordinate';
import { Geolocation, Device } from 'ionic-native';

/*
 Generated class for the TodoService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class LocatorService {
  baseUrl = "http://gaben.gleeze.com:8000/api";
  locationServiceUrl = this.baseUrl + "/coords";
  tokenServiceUrl = this.baseUrl + "/token";

  longitude = 0;
  latitude = 0;
  self = this;
  public coords:Coordinate[];

  public getLongitude() {
    return this.longitude;
  }

  public getLatitude() {
    return this.latitude;
  }

  constructor(public http: Http) {
    console.log('Hello Locator Provider');
    this.self = this;
  }

  // Get all todos
  public load(): Observable<Coordinate[]> {
    return this.http.get(this.locationServiceUrl)
      .map(res => res.json())
      .catch(this.handleError);
  }

  handleError(error) {
    console.error(error);
    alert("Error: " + error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public updateCoords(currentLongitude : number, currentLatitude) {
    Geolocation.getCurrentPosition().then((resp) => {
      this.longitude = resp.coords.longitude;
      this.latitude = resp.coords.latitude;
      currentLongitude = this.longitude;
      currentLatitude = this.latitude;
      this.save(Device.uuid, this.longitude, this.latitude)
        .subscribe(data => {
          this.self.coords = data;
      });
    }).catch((error) => {
      alert('Error occured' + error);
      console.log('Error getting location', error);
    });
  }

  public save(deviceId: any, longitude : any, latitude : any) : Observable<Coordinate[]> {
    let newCoordinate = new Coordinate(deviceId, longitude, latitude);
    let body = JSON.stringify(newCoordinate);
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.locationServiceUrl, body, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  public updateToken(deviceId : string, token : string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.tokenServiceUrl, { "deviceId" : deviceId, "token" : token }, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }
}
