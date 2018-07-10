import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

//--------
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//---------
import { AddMediaPage } from '../add-media/add-media';
import { EditMediaPage } from '../edit-media/edit-media';
import { ViewMediaPage } from '../view-media/view-media';
import { MediaItem } from '../../models/media-item/media-item.interface';
//--------

@Component({
  selector: 'page-media-board',
  templateUrl: 'media-board.html',
})

export class MediaBoardPage {

  mediaListRef$: Observable<AngularFireAction<{}>[]>//AngularFireList<MediaItem>;
  mediaList$: Observable<MediaItem[]>

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

    //point reference at firabase -> 'media-list' node
    //this.mediaListTransactRef$ = this.database.list('media-list');
    this.mediaListRef$ = database.list('media-list').snapshotChanges();

  }

  selectMediaItem(key: string){
    //go to editMediaPage, passing key (id) as param
    this.navCtrl.push(ViewMediaPage, { mediaItemId: key });
  }

  gotoAddMediaPage() {
    //go to AddMediaPage
    this.navCtrl.push(AddMediaPage);
  }

}
