# Learn Quran Native
This repository contains the native app for Learn Quran, availble both on [iOS](https://url.to.app.store) and [Android](https://url.to.google.play). If you're on the PC, please refer to [the website](https://learn-quran-remastered.firebaseapp.com). 

*[To know more about the platform itself](https://github.com/learn-quran/learn-quran).*

## Stack 📚
- **[React Native](https://facebook.github.io/react-native)**
- **[React Native Paper](https://reactnativepaper.com)**
- **[React Navigation](https://github.com/react-navigation/react-navigation)**
- **[React Native Firebase](https://rnfirebase.io)**
- **[Redux](http://redux.js.org)**

## Running Locally 🖥
1. Follow [the tutorial](https://rnfirebase.io/docs/v5.x.x/installation/initial-setup) provided by [React Native Firebase](https://rnfirebase.io).
2. Change bundle/package names to comply with the ones you created your Firebase project with.
3. Download all the dependencies using by running either `$ npm install` or `$ yarn`.
4. [iOS] Download pods using CocoaPods, follow the instructions [here](https://firebase.google.com/docs/ios/setup#add_the_sdk) if you don't have it installed already from the first step.
    - ```sh
      $ cd ios
      $ pod install
      ```
5. [Android] Set up keystores so you can build the app by following [Facebook's tutorial](https://facebook.github.io/react-native/docs/signed-apk-android).
6. [Android] Install `npx` globally so you can use `jetify`. Run `$ npm install -g npx`.
6. Run the app on either iOS or Android using `$ npm run run:<os>` or `$ yarn run:<os>`.

## Contributing 🤝
Contributions, issues and feature requests are welcome! <br>
Feel free to check the  [issues page](https://github.com/learn-quran/native/issues).

## Show your support 🥰
Give this project a  ⭐️ if you like it!

## LICENSE 📝
This project is Licensed under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/).
