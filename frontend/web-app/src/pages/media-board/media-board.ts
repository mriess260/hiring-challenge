import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

//--------
//import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FireBaseListObservable, AngularFireList } from 'angularfire2/database';
import { AddMediaPage } from '../add-media/add-media';
import { MediaItem } from '../../models/media-item/media-item.'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//--------

@Component({
  selector: 'page-media-board',
  templateUrl: 'media-board.html',
})
export class MediaBoardPage {

  //database observable reference
  /**
  mediaListRef$: FireBaseListObservable<MediaItem[]>
  //
  mediaListTransactRef$: FireBaseListObservable<MediaItem[]>
  */
  mediaListRef$: AngularFireList<MediaItem>;
  mediaList$: Observable<MediaItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    //point reference at firabase -> 'media-list' node
    //this.mediaListRef$ = this.database.list('media-list');//.snapshotChanges();

    this.mediaListTransactRef$ = this.database.list('media-list');
    this.mediaListRef$ = this.mediaListTransactRef$.snapshotChanges();


    //this.mediaListRef$.subscribe(x => console.log(x));
  }

  selectMediaItem(key: string, title: string){
    console.log(key);
    console.log(title);
    this.actionSheetCtrl.create({
      title: `${title}`,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            //go to editMediaItemPage, passing key as param
          }
        },
        {
          text: 'Delete',
          role: 'Destructive',
          handler: () => {
            //delete current piece of media
            //this.mediaListRef$.remove(mediaItem.$key);
            this.mediaListTransactRef$.remove(key);
          }
        },
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log("Edit Cancelled");
          }
        }
      ]
    }).present();
  }

  gotoAddMediaPage() {
    //go to AddMediaPage
    this.navCtrl.push(AddMediaPage);
  }

}
