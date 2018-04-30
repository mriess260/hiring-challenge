import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//----------------
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription'
//----------------
import { MediaItem } from '../../models/media-item/media-item.interface'
import { MediaForm } from '../../shared/media-form.service';
//----------------

@Component({
  selector: 'page-edit-media',
  templateUrl: 'edit-media.html',
  providers: [MediaForm]
})
export class EditMediaPage {

  //mediaItemRef$: FireBaseObjectObservable<MediaItem>;
  mediaItemRef$: AngularFireObject<MediaItem>;
  mediaItemSubscription: Subscription;
  mediaItem = {};// as MediaItem;

  formGroup: FormGroup;

  //controls exit before submission error message
  showWarning: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase, public formBuilder: FormBuilder,
  private mediaForm: MediaForm, private alertCtrl: AlertController) {

    //capture mediaItemId as NavParam
    const mediaItemId = this.navParams.get('mediaItemId');

    //set scope of firebase obj equal to navParams
    this.mediaItemRef$ = this.database.object(`media-list/${mediaItemId}`);

    //subscribe to obj and assign results to this.mediaItem
    this.mediaItemSubscription = this.database.object(`media-list/${mediaItemId}`)
    .valueChanges().subscribe(mediaItem => this.mediaItem = mediaItem);


    this.formGroup = formBuilder.group(this.mediaForm.formgroupTemplate);

    //set default to show warning on exit attempt
    this.showWarning = true;

  }


  //update firebase node with new data
  editMediaItem(mediaItem: MediaItem){
    this.mediaItemRef$.update(mediaItem);

    //Clear mediaItem
    this.mediaItem = {} as MediaItem;

    //disable warning message
    this.showWarning = false;

    //go back to media board
    this.navCtrl.pop();
  }


  ionViewWillLeave(){
    //unsubscribe from observable when leave
    this.mediaItemSubscription.unsubscribe();
  }

  ionViewCanLeave() {
    if(this.showWarning) {

      //display warning message
      let alertPopup = this.alertCtrl.create({
        title: 'Exit',
        message: 'Are you sure? Your changes have not been saved. All edited data will be lost.',
        buttons: [{
          text: 'Exit',
          handler: () => {
            alertPopup.dismiss();
            this.exitPage();
            return false;
          }
        },
        {
          text: 'Stay',
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
  }

  //exits (pops) page without triggering warning message
  private exitPage() {
    this.showWarning = false;
    this.navCtrl.pop();
  }

}
