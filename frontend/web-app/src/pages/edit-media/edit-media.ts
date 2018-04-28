import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//----------------
import {  AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
//----------------
import { MediaItem } from '../../models/media-item/media-item.interface'
//----------------

@Component({
  selector: 'page-edit-media',
  templateUrl: 'edit-media.html',
})
export class EditMediaPage {

  //mediaItemRef$: FireBaseObjectObservable<MediaItem>;
  ediaItemRef$: AngularFireObject<MediaItem>;
  mediaItemEditRef$: AngularFireObject<MediaItem>;
  mediaItem = {} as MediaItem;


  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {

    //capture mediaItemId as NavParam
    const mediaItemId = this.navParams.get('mediaItemId');

    //set scope of firebase obj equal to navParams
    this.mediaItemRef$ = this.database.object(`media-list/${mediaItemId}`);

    this.mediaItemEditRef$ = this.mediaItemRef$;

    //subscribe to obj and assign results to this.mediaItem
    this.mediaItemRef$.valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);

  }


  //update firebase node with new data
  editMediaItem(mediaItem: MediaItem){
    this.mediaItemEditRef$.update(mediaItem);

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //go back to media board
    this.navCtrl.pop();
  }

}
