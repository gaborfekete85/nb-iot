import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { LocatorService } from "../providers/LocatorService";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4bdb8b69'
  },
  'push': {
    'sender_id': '340331802320',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434',
	      'sound':true,
      	'vibrate':true
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MainPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MainPage
  ],
  providers: [ MyApp, LocatorService ]
})
export class AppModule {}
