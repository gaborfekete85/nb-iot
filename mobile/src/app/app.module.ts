import { NgModule } from '@angular/core';
// , ErrorHandler
import { IonicApp, IonicModule } from 'ionic-angular';
//, IonicErrorHandler
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { TabsPage } from '../pages/tabs/tabs';
import { MainPage } from '../pages/main/main';
import { ItemsPage } from '../pages/items/items';

import { LoginPage } from '../pages/login/login';
//import { RegisterPage } from '../pages/register/register'
import { FacebookUsers } from '../providers/facebook-users';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';

import { AnimateItemSliding } from '../components/animate-item-sliding/animate-item-sliding';

import {LocatorService} from "../providers/LocatorService";

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyCSjgYwi3EewjnCFCm564udfsurD5RIUkM",
  authDomain: "follower-5350e.firebaseapp.com",
  databaseURL: "https://follower-5350e.firebaseio.com",
  storageBucket: "follower-5350e.appspot.com",
  messagingSenderId: "340331802320"
};

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '4bdb8b69'
  },
  'auth': {
    'facebook': {
      'scope': ['user_friends']
    }
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
    HomePage,
    LoginPage,
    TabsPage,
    MainPage,
    ItemsPage,
    AnimateItemSliding
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TabsPage,
    MainPage,
    ItemsPage
  ],
  providers: [ FacebookUsers, LocatorService ]
  //providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, {FacebookUsers}]
})
export class AppModule {}
