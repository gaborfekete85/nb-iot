import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificationService {
  baseUrl = "http://192.168.0.24:8000/api";
  notificationUrl = this.baseUrl + "/notify";

  constructor(public http: Http) {
    console.log('Hello Notification Service');
  }

  handleError(error) {
    console.error(error);
    alert("Error: " + error);
    return Observable.throw(error.json().error || 'Server error');
  }

  public notifiy(deviceId : string) {
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.notificationUrl, { "deviceId" : deviceId }, {headers: headers})
      .map(res => res.json())
      .catch(this.handleError);
  }
}
