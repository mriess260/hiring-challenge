import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

//-----------
import { AngularFireDatabase, FireBaseListObservable, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//-----------
import { EditMediaPage } from '../edit-media/edit-media';
import { MediaItem } from '../../models/media-item/media-item.interface';
//-----------

@Component({
  selector: 'page-view-media',
  templateUrl: 'view-media.html',
})

export class ViewMediaPage {

  mediaItemSubscription: Subscription;
  mediaItem = {} as MediaItem;

  hideURL: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController) {

      //capture mediaItemId as NavParam
      const mediaItemId = this.navParams.get('mediaItemId');

      this.mediaItemSubscription = this.database.object(`media-list/${this.navParams.get('mediaItemId')}`)
      .valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);

      this.hideURL = true;
  }

  selectMediaOptions(){
    this.actionSheetCtrl.create({
      title: "Options",
      buttons: [
        {
          text: 'Edit',
          handler: () => {

            //go to editMediaPage, passing key (id) as param
            this.navCtrl.push(EditMediaPage, { mediaItemId: this.navParams.get('mediaItemId') });

            //must resubscribe since ionViewWillLeave is set to unsubscribe (a better fix should be found)
            this.mediaItemSubscription = this.database.object(`media-list/${this.navParams
              .get('mediaItemId')}`).valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);
            console.log(this.mediaItemSubscription);
          }
        },
        {
          text: 'Delete',
          role: 'Destructive',
          handler: () => {
            //delete current piece of media
            this.mediaItemSubscription.remove(this.mediaItemId);
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

  toggleURL(){
    this.hideURL = !this.hideURL
  }

  ionViewWillLeave(){
    //unsubscribe from observable when leave
    this.mediaItemSubscription.unsubscribe();
  }

}
