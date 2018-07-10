import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

//-----------
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
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
  mediaItem = {};// as MediaItem;

  //used to toggle view of url
  hideURL: boolean;

  mediaItemId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private database: AngularFireDatabase, private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController) {

      //capture mediaItemId as NavParam
      this.mediaItemId = this.navParams.get('mediaItemId');

      this.mediaItemSubscription = this.database.object(`media-list/${this.navParams.get('mediaItemId')}`)
      .valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);

      //controls display of media url
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
            this.mediaItemSubscription.unsubscribe();
            this.navCtrl.push(EditMediaPage, { mediaItemId: this.navParams.get('mediaItemId') });
            //must resubscribe since ionViewWillLeave is set to unsubscribe (a better fix should be found)
            this.mediaItemSubscription = this.database.object(`media-list/${this.navParams
            .get('mediaItemId')}`).valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);
          }
        },
        {
          text: 'Delete',
          role: 'Destructive',
          handler: () => {
            setTimeout(() => {  //workaround for known bug (nesting alertcontroller in actionsheet controller)
              this.showDeleteWarning();
            }, 0);
          }
        },
        {
          //do nothing
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log("Edit Cancelled");
          }
        }
      ]
    }).present();
  }

  showDeleteWarning() {
    //display warning message
    let alertPopup = this.alertCtrl.create({
      title: 'Warning',
      message: 'Are you sure? If you delete this record, it cannot be restored.',
      buttons: [{
        text: 'Delete',
        handler: () => {
          //delete current piece of media, cleanup, and exit
          alertPopup.dismiss();
          this.mediaItemSubscription.unsubscribe();
          this.database.list('media-list').remove(this.navParams.get('mediaItemId'));
          this.navCtrl.pop();
          return false;
        }
      },
      {
        text: 'Cancel',
        handler: () => {
          alertPopup.dismiss();
          return false;
        }
      }]
    });

    // Show the alert
    alertPopup.present();

    // Return false to avoid the page to be popped up
    return false;
  }


  //shows / hides media url
  toggleURL(){
    this.hideURL = !this.hideURL
  }

  ionViewWillEnter(){
    //go to editMediaPage, passing key (id) as param
    this.mediaItemSubscription.unsubscribe();
    //must resubscribe since ionViewWillLeave is set to unsubscribe (a better fix should be found)
    this.mediaItemSubscription = this.database.object(`media-list/${this.navParams
    .get('mediaItemId')}`).valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);
  }

  ionViewWillLeave(){
    //unsubscribe from observable when leave
    this.mediaItemSubscription.unsubscribe();
  }

}
