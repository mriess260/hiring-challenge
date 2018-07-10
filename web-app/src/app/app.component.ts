import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//----------
//----------
import { MediaBoardPage } from '../pages/media-board/media-board';
import { AddMediaPage } from '../pages/add-media/add-media';
import { ViewMediaPage } from '../pages/view-media/view-media';
import { EditMediaPage } from '../pages/edit-media/edit-media';
//----------

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public rootPage:any = MediaBoardPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

