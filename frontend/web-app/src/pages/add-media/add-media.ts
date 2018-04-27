import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { MediaItem } from '../../models/media-item/media-item.interface';


@Component({
  selector: 'page-add-media',
  templateUrl: 'add-media.html'
})
export class AddMediaPage {

  //create new object
  mediaItem = {} as MediaItem

  //database observable reference
  mediaItemRef$: FirebaseListObservable<MediaItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {
    this.mediaItemRef$ = this.database.list('media-list');
  }

  addMediaItem(mediaItem: MediaItem){

    // create new anonymous object and push this to firebase under media-list node
    this.mediaItemRef$.push({
      title: this.mediaItem.title,
      url: this.mediaItem.url
    });

    //<<for testing>>
    console.log(mediaItem);

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //go back to media board
    this.navCtrl.pop();
  }

}
