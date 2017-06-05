# IONIC 2 Mobile Application

## Requirements
- Node, npm - Installation detailed in the parent readme
- Ionic2: `sudo npm install -g ionic`
- Cordova: `sudo npm install -g cordova`

## Installation
- Install dependencies: `npm install`
- Start the application: `ionic serve`

## Run on mobile device
- Download Android Studio from [Android Studio Download Page](https://developer.android.com/studio/index.html)
- Configure it and Check to **Download SDK**

#### Configure environment variables

| Variable      | Sample        |
| ------------- |:-------------:|
| ANDROID_HOME  | export ANDROID_HOME=/home/**[USER]**/Android/Sdk |
| PATH          | export PATH=$PATH:/home/**[USER]**/Android/Sdk/tools |

#### Let's rock it
*Connect your device via USB*
```
ionic cordova platform add android
ionic cordova run android
```
