export class Coordinate {
  constructor(deviceId:string, longitude : number, latitude : number) {
    this.deviceId = deviceId;
    this.longitude = longitude;
    this.latitude = latitude;
  }

  _id:number;
  deviceId:string;
  longitude:number;
  latitude:number;

}
