import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//------------
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CREDENTS } from './firebase.credentials';
import { MediaBoardPage } from '../pages/media-board/media-board';
import { AddMediaPage } from '../pages/add-media/add-media';
import { AngularFireDatabaseModule } from 'angularfire2/database';
//------------

import { MyApp } from './app.component';
//XXXimport { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    MyApp,
    MediaBoardPage,
    AddMediaPage
  ],
  imports: [
    BrowserModule,

    IonicModule.forRoot(MyApp),
    //initialize AngulareFire with credentials from dashboard
    AngularFireModule.initializeApp(FIREBASE_CREDENTS),
    //Import the AngularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MediaBoardPage,
    AddMediaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
